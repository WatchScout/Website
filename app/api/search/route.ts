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

// better intent detection than length
const hasDigit = /\d/.test(qLower);
const looksLikeRef = /[a-z]{1,}\d{2,}|^\d{4,}$/.test(qLower.replace(/\s+/g, ""));
const tokenCount = qLower.split(/\s+/).filter(Boolean).length;

const isModelSearch = hasDigit || looksLikeRef;
const isBroadSearch = !isModelSearch;


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

    const negativeTitleTerms = [
  "handbag", "purse", "satchel", "bag", "wallet", "belt", "sunglasses",
  "perfume", "cologne", "fragrance", "necklace", "ring", "earrings",
  "shoe", "shoes", "sneaker", "sneakers", "jewelry", "jewellery",
  "keychain", "key chain"
];

const watchIntentTerms = [
  "watch", "watches", "automatic", "chronograph", "chrono", "diver", "diving",
  "gmt", "pilot", "field", "dress", "mechanical", "quartz", "stainless",
  "bracelet", "dial", "bezel", "case", "movement",
  // common brands to help intent
  "seiko", "tissot", "omega", "rolex", "hamilton", "citizen", "casio",
  "orient", "bulova", "tag", "heuer", "longines", "tudor", "breitling"
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

      // Filter obvious non-watch items
.filter((it: any) => {
  const title = (it.title || "").toLowerCase();
  return !negativeTitleTerms.some((bad) => title.includes(bad));
})

// For broad searches, enforce watch intent so "speedy" doesn't return bags
.filter((it: any) => {
  if (!isBroadSearch) return true;
  const title = (it.title || "").toLowerCase();
  return watchIntentTerms.some((w) => title.includes(w));
})


      // Query match:
// - model/ref searches: loose "includes" on cleaned strings (keeps your SSC911 behavior)
// - broad searches: require all tokens somewhere in the title
.filter((it: any) => {
  const title = (it.title || "").toLowerCase();

  if (isModelSearch) {
    const cleanTitle = title.replace(/\s+/g, "");
    const cleanQuery = qLower.replace(/\s+/g, "");
    return cleanTitle.includes(cleanQuery);
  }

  const tokens = qLower.split(/\s+/).filter(Boolean);
  return tokens.every((t) => title.includes(t));
})


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

