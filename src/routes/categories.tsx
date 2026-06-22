import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, articlesByCategory } from "@/lib/site-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Habari Leo" },
      { name: "description", content: "Browse all sections covered by Habari Leo's newsroom." },
      { property: "og:title", content: "Categories — Habari Leo" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <header className="mb-10">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl">All categories</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pick a section to dive deeper into the stories shaping Kenya today.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const count = articlesByCategory(cat.slug).length;
          const accent = cat.accent === "orange" ? "bg-orange text-orange-foreground"
            : cat.accent === "aqua" ? "bg-aqua text-aqua-foreground" : "bg-primary text-primary-foreground";
          return (
            <Link key={cat.slug} to="/category/$slug" params={{ slug: cat.slug }}
              className="group rounded-xl border border-border bg-card p-6 card-hover">
              <span className={`chip ${accent} mb-4`}>{cat.name}</span>
              <h2 className="font-display font-bold text-xl group-hover:text-orange transition-colors">{cat.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{count} stories</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
