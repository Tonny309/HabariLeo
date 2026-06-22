import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CATEGORIES, articlesByCategory } from "@/lib/site-data";
import { ArticleCard } from "@/components/site/article-card";
import { TrendingSidebar } from "@/components/site/trending-sidebar";
import { AdSlot } from "@/components/site/ad-slot";
import { SectionHeading } from "@/components/site/section-heading";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug as never);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { cat } = loaderData;
    return {
      meta: [
        { title: `${cat.name} News — Habari Leo` },
        { name: "description", content: cat.description },
        { property: "og:title", content: `${cat.name} News — Habari Leo` },
        { property: "og:description", content: cat.description },
        { property: "og:url", content: `/category/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.slug}` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Category not found</h1>
      <Link to="/" className="mt-4 inline-block text-aqua hover:underline">Back to home</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const articles = articlesByCategory(cat.slug);
  const [lead, ...rest] = articles;

  const accentClass = cat.accent === "orange" ? "bg-orange text-orange-foreground"
    : cat.accent === "aqua" ? "bg-aqua text-aqua-foreground" : "bg-primary text-primary-foreground";

  return (
    <div className="container-page py-8 md:py-12">
      <header className={`rounded-2xl ${accentClass} p-8 md:p-10 mb-10`}>
        <nav aria-label="Breadcrumb" className="text-xs opacity-80 mb-2">
          <Link to="/" className="hover:underline">Home</Link> / {cat.name}
        </nav>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">{cat.name}</h1>
        <p className="mt-3 max-w-2xl text-base opacity-90">{cat.description}</p>
        <p className="mt-3 text-xs uppercase tracking-wider opacity-75">{articles.length} stories</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          {lead && (
            <section className="mb-10">
              <ArticleCard article={lead} variant="large" />
            </section>
          )}

          {rest.length > 0 && (
            <section>
              <SectionHeading title={`More in ${cat.name}`} accent={cat.accent} />
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
              </div>
            </section>
          )}

          {articles.length === 0 && (
            <p className="text-muted-foreground">No articles in this category yet. Check back soon.</p>
          )}

          <div className="mt-10">
            <AdSlot label="In-feed Ad · 728×90" height={120} />
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  );
}
