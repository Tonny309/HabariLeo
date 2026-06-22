import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { ARTICLES, CATEGORIES } from "@/lib/site-data";
import { ArticleCard } from "@/components/site/article-card";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  cat: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Search — Habari Leo" },
      { name: "description", content: "Search across the Habari Leo archive." },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);

  const term = q.trim().toLowerCase();
  const results = ARTICLES.filter((a) => {
    const matchesCat = !cat || a.category === cat;
    if (!matchesCat) return false;
    if (!term) return false;
    return (
      a.title.toLowerCase().includes(term) ||
      a.subtitle.toLowerCase().includes(term) ||
      a.excerpt.toLowerCase().includes(term) ||
      a.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  const suggestions = !term
    ? ARTICLES.slice(0, 6)
    : [];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { q: query, cat } });
  };

  return (
    <div className="container-page py-8 md:py-12 max-w-5xl">
      <h1 className="font-display font-extrabold text-3xl md:text-4xl">Search</h1>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tags, authors..."
            className="w-full rounded-md border border-input bg-card pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => navigate({ search: { q, cat: e.target.value } })}
          className="rounded-md border border-input bg-card px-3 py-2.5 text-sm"
        >
          <option value="">All sections</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <button className="rounded-md bg-orange text-orange-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90">
          Search
        </button>
      </form>

      <div className="mt-10">
        {term ? (
          <>
            <p className="text-sm text-muted-foreground mb-5">
              {results.length} result{results.length === 1 ? "" : "s"} for <strong className="text-foreground">"{q}"</strong>
              {cat ? <> in <strong className="text-foreground">{CATEGORIES.find((c) => c.slug === cat)?.name}</strong></> : null}
            </p>
            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <h2 className="font-display text-xl font-bold">No matches found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a broader keyword, remove the section filter, or browse the latest news.
                </p>
                <Link to="/news" className="mt-4 inline-block text-sm font-semibold text-aqua hover:underline">
                  Browse all news →
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((a) => <ArticleCard key={a.slug} article={a} />)}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="font-display font-bold text-lg mb-4">Trending searches</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Treasury", "M-PESA", "Kipyegon", "UHC", "NSE", "Konza", "Harambee Stars"].map((s) => (
                <Link key={s} to="/search" search={{ q: s, cat: "" } as never}
                  className="chip bg-muted text-muted-foreground hover:bg-orange hover:text-orange-foreground">
                  {s}
                </Link>
              ))}
            </div>
            <h2 className="font-display font-bold text-lg mb-4">Latest stories</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
