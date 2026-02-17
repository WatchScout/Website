// app/articles/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | The Watch Scout",
  description: "Watch guides, buying tips, and collector-friendly education.",
  alternates: { canonical: "/articles" },
};



const articles = [
  {
    title: "Watches 101: The Beginner’s Guide to Buying Your First “Real” Watch",
    slug: "watches-101",
    excerpt:
      "Movements, styles, specs, and how to buy your first real watch without wasting money.",
    tag: "Watches 101",
  },
];

export default function ArticlesIndexPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Articles</h1>
        <p className="mt-2 text-zinc-700">
          Watch buying guides and no-BS explanations for normal humans.
        </p>
      </div>

      <div className="grid gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="rounded-2xl border border-zinc-200 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
              {a.tag}
            </div>
            <h2 className="m-0 text-xl font-semibold">{a.title}</h2>
            <p className="mt-2 text-zinc-700">{a.excerpt}</p>
            <p className="mt-3 text-sm text-zinc-600">Read →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
