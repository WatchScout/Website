// app/articles/watches-101/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watches 101: The Beginner’s Guide to Buying Your First Real Watch | The Watch Scout",
  description:
    "A beginner-friendly guide to watch movements, styles, specs, and how to buy your first real watch without getting ripped off.",
  alternates: { canonical: "/articles/watches-101" },
  openGraph: {
    title: "Watches 101: The Beginner’s Guide to Buying Your First Real Watch",
    description:
      "Learn movements, styles, key specs, and how to buy your first real watch with confidence.",
    url: "/articles/watches-101",
    type: "article",
  },
};

export default function Watches101Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <article className="prose prose-zinc max-w-none">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wide text-zinc-600">
            Watches 101
          </p>
          <h1 className="mb-3">
            Watches 101: The Beginner’s Guide to Buying Your First “Real” Watch
          </h1>
          <p className="mt-0 text-lg text-zinc-700">
            If you’ve ever looked at watches online and thought, “I have no idea what I’m
            looking at” — you’re not alone. Let’s fix that.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-600">
            <span>By The Watch Scout</span>
            <span aria-hidden="true">•</span>
            <span>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span aria-hidden="true">•</span>
            <span>~8 min read</span>
          </div>
        </header>

        <hr />

        <h2>What Makes a Watch “Good”?</h2>
        <p>
          A good watch isn’t about price. It’s about <strong>value</strong>,{" "}
          <strong>build quality</strong>, and whether it fits your lifestyle.
        </p>
        <ul>
          <li>a daily tool</li>
          <li>a fashion accessory</li>
          <li>a collector’s item</li>
          <li>a legacy piece you pass down</li>
        </ul>
        <p>
          And yes… it can also just be something that makes you feel like James Bond when you
          check the time. That’s valid too.
        </p>

        <h2>The 3 Main Types of Watch Movements</h2>
        <p>A “movement” is the engine inside the watch. It’s what keeps time.</p>

        <h3>1) Quartz (Battery Powered)</h3>
        <p>
          Quartz watches run on a battery and use a quartz crystal to regulate time.
        </p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>Very accurate</li>
          <li>Affordable</li>
          <li>Low maintenance</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Less “soul” (according to watch nerds)</li>
          <li>Battery eventually needs replacing</li>
        </ul>
        <p>Quartz is perfect if you want something reliable and simple.</p>

        <h3>2) Automatic (Self-Winding Mechanical)</h3>
        <p>
          Automatic watches wind themselves using a spinning rotor that moves when you wear
          the watch.
        </p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>Classic mechanical craftsmanship</li>
          <li>No battery</li>
          <li>Feels like owning a tiny machine on your wrist</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Less accurate than quartz</li>
          <li>Needs servicing every few years</li>
        </ul>
        <p>If you want that “real watch” experience, automatic is the sweet spot.</p>

        <h3>3) Manual Wind (Mechanical)</h3>
        <p>Manual watches must be wound by hand, usually daily or every couple of days.</p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>Old-school and cool</li>
          <li>Often thinner and more elegant</li>
          <li>Very collectible</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>You have to wind it</li>
          <li>Easier to forget</li>
        </ul>
        <p>Manual wind is for people who like ritual and history.</p>

        <h2>Watch Styles You Should Know</h2>

        <h3>Dive Watches</h3>
        <p>
          Built for water resistance and durability. Usually have a rotating bezel.
          <br />
          <strong>Vibe:</strong> rugged, sporty, “I might jump into the ocean at any moment.”
        </p>
        <p>
          Even if you never touch water, dive watches are some of the best daily watches ever
          made.
        </p>

        <h3>Field Watches</h3>
        <p>
          Military-inspired, easy to read, lightweight, practical.
          <br />
          <strong>Vibe:</strong> tough, minimalist, outdoorsy.
        </p>

        <h3>Pilot Watches</h3>
        <p>
          Big dials, easy legibility, aviation heritage.
          <br />
          <strong>Vibe:</strong> bold, masculine, classic tool watch energy.
        </p>

        <h3>Dress Watches</h3>
        <p>
          Slim, clean, meant to wear with formal outfits.
          <br />
          <strong>Vibe:</strong> classy, understated.
        </p>

        <h3>Chronographs</h3>
        <p>
          Watches with stopwatch functions. Usually have multiple subdials.
          <br />
          <strong>Vibe:</strong> racing, aviation, tactical, complicated (in a good way).
        </p>

        <h2>Watch Specs That Actually Matter</h2>

        <h3>Water Resistance (WR)</h3>
        <p>Here’s the simplified version:</p>
        <ul>
          <li><strong>30m / 3ATM</strong>: splash resistant (don’t swim)</li>
          <li><strong>50m / 5ATM</strong>: okay for showering, light water</li>
          <li><strong>100m / 10ATM</strong>: safe for swimming</li>
          <li><strong>200m+</strong>: diving, heavy water use</li>
        </ul>
        <p>If you want a true everyday watch, <strong>100m is a great baseline</strong>.</p>

        <h3>Case Size</h3>
        <ul>
          <li><strong>36–38mm</strong> = classic / vintage size</li>
          <li><strong>39–42mm</strong> = modern sweet spot</li>
          <li><strong>43mm+</strong> = big, bold tool watches</li>
        </ul>
        <p>But here’s the secret: <strong>lug-to-lug matters more than case size</strong>.</p>

        <h3>Lug-to-Lug (The Real Fit Measurement)</h3>
        <p>
          Lug-to-lug is the distance from the top lug to the bottom lug. If it’s too long,
          it’ll hang off your wrist and look ridiculous.
        </p>
        <p>
          A solid general rule: under <strong>50mm lug-to-lug</strong> fits most wrists comfortably.
        </p>

        <h3>Crystal Type</h3>
        <ul>
          <li><strong>Mineral</strong>: decent, affordable</li>
          <li><strong>Sapphire</strong>: scratch resistant and premium</li>
          <li><strong>Acrylic</strong>: vintage style, scratches easily but buffs out</li>
        </ul>
        <p>If you can get sapphire, get sapphire.</p>

        <h2>The Biggest Watch Buying Mistake Beginners Make</h2>
        <ol>
          <li><strong>Buying a cheap fashion watch</strong> (you pay for branding, not quality)</li>
          <li><strong>Buying something too big</strong> (looks cool online, wears like a dinner plate)</li>
          <li><strong>Buying hype instead of value</strong> (trends come and go)</li>
        </ol>

        <h2>Best Beginner Watch Brands (That Watch Nerds Respect)</h2>
        <h3>Budget Legends</h3>
        <ul>
          <li>Casio</li>
          <li>Timex</li>
          <li>Seiko</li>
          <li>Citizen</li>
          <li>Orient</li>
        </ul>

        <h3>“Entry Luxury” Brands</h3>
        <ul>
          <li>Hamilton</li>
          <li>Tissot</li>
          <li>Certina</li>
          <li>Mido</li>
          <li>Longines</li>
        </ul>

        <h2>How Much Should You Spend on Your First Watch?</h2>
        <ul>
          <li><strong>Under $100</strong>: quartz value zone</li>
          <li><strong>$100–$300</strong>: sweet spot (Seiko/Citizen dominate)</li>
          <li><strong>$300–$800</strong>: great automatics</li>
          <li><strong>$800+</strong>: luxury & serious collecting territory</li>
        </ul>
        <p>You don’t need to start at $800. Start smart.</p>

        <h2>The Watch Scout Rule: Buy the Watch You’ll Actually Wear</h2>
        <p>
          The best watch isn’t the most expensive one. It’s the one that fits your wrist,
          matches your style, and feels good every time you check the time.
        </p>

        <h2>Final Advice: Start Simple, Start Smart</h2>
        <ol>
          <li>Pick a style (diver, field, chrono, etc.)</li>
          <li>Choose a trusted brand</li>
          <li>Stay within your budget</li>
          <li>Focus on comfort and versatility</li>
        </ol>

        <p>
          Next up on The Watch Scout: best first automatics, bracelet sizing, what makes a
          watch collectible, and Bond-style watches that don’t cost $10,000.
        </p>

        <hr />

        <p className="text-sm text-zinc-600">
          Want me to add a table of contents + “related articles” block and wire it into your site’s
          existing layout? Tell me what your current <code>app/layout.tsx</code> and styling setup is.
        </p>
      </article>
    </main>
  );
}
