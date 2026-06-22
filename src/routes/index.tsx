import { createFileRoute, Link } from "@tanstack/react-router";
import {
  featuredArticle, articlesByCategory, latestArticles, editorsPicks, CATEGORIES, HERO_IMAGE, SITE, formatDate, getAuthor,
} from "@/lib/site-data";
import { ArticleCard, CategoryChip } from "@/components/site/article-card";
import { SectionHeading } from "@/components/site/section-heading";
import { TrendingSidebar } from "@/components/site/trending-sidebar";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { AdSlot } from "@/components/site/ad-slot";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = featuredArticle();
  const secondary = editorsPicks(4).filter((a) => a.slug !== featured.slug).slice(0, 4);
  const featuredAuthor = getAuthor(featured.authorSlug);

  return (
    <div className="container-page py-6 md:py-10">
      {/* ============================ HERO ============================ */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]" aria-labelledby="hero-heading">
        <Link
          to="/article/$slug"
          params={{ slug: featured.slug }}
          className="group relative block aspect-[16/10] overflow-hidden rounded-2xl shadow-card"
        >
          <img src={featured.image || HERO_IMAGE} alt={featured.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 text-white">
            <CategoryChip slug={featured.category} name={CATEGORIES.find((c) => c.slug === featured.category)!.name} accent="orange" onDark />
            <h1 id="hero-heading" className="mt-3 font-display font-extrabold text-2xl md:text-4xl lg:text-5xl leading-[1.1] max-w-3xl group-hover:text-orange transition-colors">
              {featured.title}
            </h1>
            <p className="mt-3 text-sm md:text-lg text-white/85 max-w-2xl line-clamp-2">{featured.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs md:text-sm text-white/80">
              <span>By {featuredAuthor.name}</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readingMinutes} min read</span>
            </div>
          </div>
        </Link>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {secondary.map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
        </div>
      </section>

      <div className="my-10">
        <AdSlot label="Leaderboard · 970×120" variant="banner" />
      </div>

      {/* ===================== LATEST + SIDEBAR ===================== */}
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <section aria-labelledby="latest-heading">
            <SectionHeading title="Latest stories" accent="orange" viewAllHref="/news" />
            <div className="grid gap-6 sm:grid-cols-2">
              {latestArticles(6).map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>

          {CATEGORIES.slice(1).map((cat, idx) => {
            const list = articlesByCategory(cat.slug);
            if (list.length === 0) return null;
            const [lead, ...rest] = list;
            return (
              <section key={cat.slug} aria-labelledby={`cat-${cat.slug}-heading`}>
                <SectionHeading title={cat.name} accent={cat.accent} viewAllHref={`/category/${cat.slug}`} />
                <div className="grid gap-6 md:grid-cols-2">
                  <ArticleCard article={lead} variant="large" />
                  <div className="flex flex-col">
                    {rest.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
                  </div>
                </div>
                {idx === 1 && (
                  <div className="mt-8"><AdSlot label="In-feed Ad · Native" height={140} /></div>
                )}
              </section>
            );
          })}
        </div>

        <TrendingSidebar />
      </div>

      {/* ========================= NEWSLETTER ========================= */}
      <section className="mt-16 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 relative overflow-hidden" aria-labelledby="newsletter-heading">
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-brand)" }} aria-hidden />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <p className="chip bg-orange text-orange-foreground w-fit">Daily briefing</p>
            <h2 id="newsletter-heading" className="font-display font-extrabold text-3xl md:text-4xl mt-3">
              Kenya's morning, in 5 minutes.
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Join over 240,000 readers who start their weekday with our handpicked summary
              of overnight headlines, market moves and must-read analysis.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
