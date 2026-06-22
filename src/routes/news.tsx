import { createFileRoute } from "@tanstack/react-router";
import { latestArticles } from "@/lib/site-data";
import { ArticleCard } from "@/components/site/article-card";
import { TrendingSidebar } from "@/components/site/trending-sidebar";
import { SectionHeading } from "@/components/site/section-heading";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "All News — Habari Leo" },
      { name: "description", content: "The latest news from Kenya and East Africa: politics, business, technology, health, sports and entertainment." },
      { property: "og:title", content: "All News — Habari Leo" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  const items = latestArticles(50);
  return (
    <div className="container-page py-8 md:py-12">
      <header className="mb-10">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl">Newsroom</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every story from the Habari Leo desk, ordered by publication time. Filter by section using the navigation above.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <SectionHeading title="Latest" accent="orange" />
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
        <TrendingSidebar />
      </div>
    </div>
  );
}
