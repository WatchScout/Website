import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const qRaw = (searchParams.get("q") || "").trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const num = Math.min(50, Math.max(6, parseInt(searchParams.get("num") || "24", 10))); // keep sane

    if (!qRaw) {
      return NextResponse.json({ error: "Missing q parameter" }, { status: 400 });
    }

    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing SERPAPI_KEY" }, { status: 500 });
    }

    const start = (page - 1) * num;

    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_shopping");
    url.searchParams.set("q", qRaw);
    url.searchParams.set("hl", "en");
    url.searchParams.set("gl", "us");
    url.searchParams.set("num", String(num));
    url.searchParams.set("start", String(start)); // ✅ pagination
    url.searchParams.set("api_key", apiKey);

    const r = await fetch(url.toString(), { cache: "no-store" });

    if (!r.ok) {
      const detail = await r.text();
      return NextResponse.json(
        { error: "SerpAPI request failed", detail },
        { status: 502 }
      );
    }

    const data = await r.json();

    const qLower = qRaw.toLowerCase();
    const isBroadSearch = qLower.length <= 8;

    const allowedSources = [
      "chrono24",
      "jomashop",
      "ebay",
      "ashford",
      "watchmaxx",
      "amazon",
      "walmart",
      "seiko",      // optional: brand stores sometimes appear as source
      "seiko usa",  // optional
    ];

    // Merge possible arrays SerpAPI can return
    const allItems = [
      ...(data.shopping_results || []),
      ...(data.inline_shopping_results || []),
    ];

    const results = allItems
      // Only enforce allowed sources for model-specific searches
      .filter((it: any) => {
        if (isBroadSearch) return true;
        const sourceText = (it.source || "").toLowerCase();
        return allowedSources.some((s) => sourceText.includes(s));
      })

      // Filter out straps / bands / bracelets
      .filter((it: any) => {
        const title = (it.title || "").toLowerCase();
        return (
          !title.includes("strap") &&
          !title.includes("band") &&
          !title.includes("bracelet")
        );
      })

      // Query match:
      // - broad searches: contains
      // - model-ish searches: ignore spaces
      .filter((it: any) => {
        const title = (it.title || "").toLowerCase();

        if (isBroadSearch) {
          return title.includes(qLower);
        }

        const cleanTitle = title.replace(/\s+/g, "");
        const cleanQuery = qLower.replace(/\s+/g, "");
        return cleanTitle.includes(cleanQuery);
      })

      .map((it: any) => ({
        title: it.title,
        link: it.link || it.product_link,
        source: it.source || "",
        price: it.price || null,
        extracted_price: it.extracted_price ?? null,
        rating: it.rating ?? null,
        reviews: it.reviews ?? null,
        thumbnail: it.thumbnail ?? null,
        condition: it.second_hand_condition ?? null,
      }));

    // Low price first by default
    results.sort(
      (a: any, b: any) =>
        (a.extracted_price ?? 999999999) - (b.extracted_price ?? 999999999)
    );

    // ✅ If SerpAPI gives a "next" page, we expose it
    const hasNext = !!data?.serpapi_pagination?.next;

    return NextResponse.json({
      query: qRaw,
      results,
      meta: {
        page,
        num,
        start,
        total_incoming: allItems.length,
        returned: results.length,
        nextPage: hasNext ? page + 1 : null,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}

