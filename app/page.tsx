export default function LandingPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "56px 18px 72px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#777",
              marginBottom: 12,
            }}
          >
            Elite watch price discovery
          </div>

          <h1 style={{ fontSize: 44, margin: 0, letterSpacing: 1.2 }}>
            THE WATCH SCOUT
          </h1>

          <div
            style={{
              marginTop: 16,
              height: 1,
              background: "#eee",
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>

        <div style={{ marginTop: 28, color: "#222", fontSize: 16, lineHeight: 1.6 }}>
          <p style={{ marginTop: 0 }}>
            We’re building a multi-source watch price engine designed to surface the best deals
            across trusted marketplaces and sellers — in one place.
          </p>

          <ul style={{ margin: "18px 0 0", paddingLeft: 18, color: "#333" }}>
            <li>Multi-marketplace aggregation</li>
            <li>Deduplication + price normalization</li>
            <li>Smart ranking for “best deal” results</li>
            <li>Clean, watch-first interface</li>
          </ul>

          <p style={{ marginTop: 18, color: "#555" }}>
            🚧 Currently in private development. Beta launching soon.
          </p>

          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 14,
              border: "1px solid #eee",
              background: "#fafafa",
            }}
          >
            <div style={{ fontSize: 12, color: "#777", letterSpacing: 1.4, textTransform: "uppercase" }}>
              Partnerships / API inquiries
            </div>
            <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700 }}>
              founder@thewatchscout.com
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <a
              href="/search"
              style={{
                display: "inline-block",
                padding: "12px 18px",
                borderRadius: 999,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Try the prototype search →
            </a>
          </div>

          <div
            style={{
              marginTop: 38,
              paddingTop: 18,
              borderTop: "1px solid #eee",
              color: "#777",
              fontSize: 12,
            }}
          >
            © {new Date().getFullYear()} The Watch Scout • Independent project • Not affiliated with sellers
          </div>
        </div>
      </div>
    </main>
  );
}
