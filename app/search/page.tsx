"use client";

import { useMemo, useState, type FormEvent } from "react";

type ResultItem = {
  title: string;
  link: string;
  source: string;
  price: string | null;
  extracted_price: number | null;
  rating: number | null;
  reviews: number | null;
  thumbnail: string | null;
  condition: string | null;
};

type ApiMeta = {
  nextPage?: number | null;
};

type ApiResponse = {
  query: string;
  results: ResultItem[];
  meta?: ApiMeta;
  error?: string;
  detail?: string;
};

type SortMode = "low" | "high" | "rating" | "reviews";

export default function HomePage() {
  const [q, setQ] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("low");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  async function runSearch(e?: FormEvent) {
    e?.preventDefault();
    const term = q.trim();
    if (!term) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(term)}&page=1&num=24`,
        { cache: "no-store" }
      );

      const text = await res.text();
      let data: ApiResponse;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON. Check /api/search for errors.");
      }

      if (!res.ok) throw new Error(data?.error || "Search failed");

      setResults(data.results || []);
      setLastQuery(data.query || term);
      setPage(1);
      setHasMore(!!data?.meta?.nextPage);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setResults([]);
      setLastQuery("");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!lastQuery || loading || !hasMore) return;

    const next = page + 1;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(lastQuery)}&page=${next}&num=24`,
        { cache: "no-store" }
      );

      const text = await res.text();
      let data: ApiResponse;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON.");
      }

      if (!res.ok) throw new Error(data?.error || "Load more failed");

      setResults((prev) => [...prev, ...(data.results || [])]);
      setPage(next);
      setHasMore(!!data?.meta?.nextPage);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const sortedResults = useMemo(() => {
    const arr = [...results];
    const num = (v: number | null | undefined, fallback: number) =>
      typeof v === "number" && !Number.isNaN(v) ? v : fallback;

    arr.sort((a, b) => {
      if (sortMode === "low")
        return num(a.extracted_price, 999999999) - num(b.extracted_price, 999999999);
      if (sortMode === "high")
        return num(b.extracted_price, -1) - num(a.extracted_price, -1);
      if (sortMode === "rating") return num(b.rating, -1) - num(a.rating, -1);
      if (sortMode === "reviews") return num(b.reviews, -1) - num(a.reviews, -1);
      return 0;
    });

    return arr;
  }, [results, sortMode]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "34px 16px 60px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#777",
              marginBottom: 10,
            }}
          >
            Price-check watches across trusted sellers
          </div>

          <h1 style={{ fontSize: 40, margin: 0, letterSpacing: 1.2 }}>THE WATCH SCOUT</h1>

          <div
            style={{
              marginTop: 12,
              height: 1,
              background: "#eee",
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>

        {/* Search */}
        <p style={{ marginTop: 0, color: "#444", fontSize: 14 }}>
          Type a model (ex: <b>SSC911</b>) and pull shopping results.
        </p>

        <form onSubmit={runSearch} style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ex: SSC911, Speedmaster, Submariner 124060..."
            style={{
              flex: 1,
              padding: "14px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              minWidth: 130,
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Status + Sort */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#333" }}>
            {lastQuery ? (
              <>
                Showing <b>{sortedResults.length}</b> result(s) for <b>{lastQuery}</b>
              </>
            ) : (
              <span style={{ color: "#777" }}>Run a search to see results.</span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ fontSize: 13, color: "#444" }}>Sort by:</label>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #ddd",
                fontSize: 13,
                background: "#fff",
              }}
              disabled={sortedResults.length === 0}
            >
              <option value="low">Lowest price</option>
              <option value="high">Highest price</option>
              <option value="rating">Highest rating</option>
              <option value="reviews">Most reviews</option>
            </select>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              border: "1px solid #f2b8b5",
              background: "#fff5f5",
              color: "#8a1f17",
            }}
          >
            {error}
          </div>
        )}

        {/* Results */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {sortedResults.map((it, idx) => (
            <a
              key={idx}
              href={it.link}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #eee",
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: 200,
                  background: "#f6f6f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {it.thumbnail ? (
                  <img
                    src={it.thumbnail}
                    alt={it.title}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ color: "#999", fontSize: 14 }}>No image</div>
                )}
              </div>

              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {it.source || "Unknown source"}
                  {it.condition ? ` • ${it.condition}` : ""}
                </div>

                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.25 }}>
                  {it.title}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {it.price ??
                      (it.extracted_price != null
                        ? `$${it.extracted_price.toLocaleString()}`
                        : "—")}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {it.rating != null ? (
                      <span>⭐ {it.rating}</span>
                    ) : (
                      <span style={{ color: "#999" }}>—</span>
                    )}
                    {it.reviews != null ? (
                      <span>({it.reviews})</span>
                    ) : (
                      <span style={{ color: "#999" }}>(—)</span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More */}
        {lastQuery && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button
              onClick={loadMore}
              disabled={!hasMore || loading}
              style={{
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid #111",
                background: hasMore ? "#111" : "#eee",
                color: hasMore ? "#fff" : "#666",
                cursor: hasMore && !loading ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "Loading..." : hasMore ? "Load More" : "No More Results"}
            </button>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 18,
            borderTop: "1px solid #eee",
            color: "#777",
            fontSize: 12,
          }}
        >
          © {new Date().getFullYear()} The Watch Scout • Aggregated shopping results • Not
          affiliated with sellers
        </div>
      </main>
    </div>
  );
}