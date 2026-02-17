export default function AboutPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 18px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#777",
              marginBottom: 12,
            }}
          >
            About
          </div>

          <h1 style={{ fontSize: 38, margin: 0, letterSpacing: 1 }}>
            THE WATCH SCOUT
          </h1>

          <div
            style={{
              marginTop: 16,
              height: 1,
              background: "#eee",
              maxWidth: 680,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>

        <div style={{ fontSize: 16, lineHeight: 1.7, color: "#222" }}>
          <p style={{ marginTop: 0 }}>
            The Watch Scout is building a multi-source watch price engine designed
            to surface the best available watch deals across trusted marketplaces
            and sellers — in one place.
          </p>

          <p>
            Buying a watch today often means opening ten tabs, comparing listings,
            filtering out irrelevant results, and manually checking prices across
            different platforms. Valuable listings get missed. Pricing is inconsistent.
            Time is wasted.
          </p>

          <p>
            The Watch Scout is being built to solve that problem.
          </p>

          <h2 style={{ marginTop: 36, fontSize: 20 }}>What We’re Building</h2>

          <ul style={{ marginTop: 12, paddingLeft: 20 }}>
            <li>Multi-marketplace aggregation</li>
            <li>Price normalization across sources</li>
            <li>Intelligent deduplication</li>
            <li>Smart ranking based on value and relevance</li>
            <li>Clean, watch-first interface</li>
          </ul>

          <p style={{ marginTop: 20 }}>
            Our goal is simple: become the most trusted watch price discovery
            platform on the internet.
          </p>

          <h2 style={{ marginTop: 36, fontSize: 20 }}>Status</h2>

          <p>
            The platform is currently in active development. Initial search
            functionality is live in prototype form while we expand data sources,
            refine ranking logic, and build a scalable aggregation architecture.
          </p>

          <h2 style={{ marginTop: 36, fontSize: 20 }}>Contact</h2>

          <p>
            For partnerships, API access, or inquiries:
          </p>

          <div
            style={{
              marginTop: 12,
              padding: 16,
              borderRadius: 14,
              border: "1px solid #eee",
              background: "#fafafa",
              fontWeight: 600,
            }}
          >
            founder@thewatchscout.com
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 18,
              borderTop: "1px solid #eee",
              fontSize: 12,
              color: "#777",
            }}
          >
            Independent project. Not affiliated with or endorsed by any watch
            brands or marketplaces.
          </div>
        </div>
      </div>
    </main>
  );
}
