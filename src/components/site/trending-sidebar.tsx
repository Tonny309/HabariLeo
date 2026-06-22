import { ArticleCard } from "./article-card";
import { trendingArticles, mostRead } from "@/lib/site-data";
import { AdSlot } from "./ad-slot";

/** Right-rail sidebar with trending, most-read and an advertisement slot. */
export function TrendingSidebar() {
  const trending = trendingArticles(5);
  const popular = mostRead(5);

  return (
    <aside className="space-y-8">
      <section>
        <h3 className="font-display font-extrabold text-lg mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange" /> Trending now
        </h3>
        <ol className="divide-y divide-border">
          {trending.map((a, i) => (
            <li key={a.slug} className="flex gap-3 py-3 first:pt-0">
              <span className="font-display text-2xl font-extrabold text-orange/80 shrink-0 w-7">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a href={`/article/${a.slug}`} className="font-display font-semibold text-sm leading-snug hover:text-orange">
                {a.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <AdSlot label="Sidebar Ad · 300×250" height={250} />

      <section>
        <h3 className="font-display font-extrabold text-lg mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-aqua" /> Most read this week
        </h3>
        <div>
          {popular.map((a) => <ArticleCard key={a.slug} article={a} variant="compact" />)}
        </div>
      </section>
    </aside>
  );
}
