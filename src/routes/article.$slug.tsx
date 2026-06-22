import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  getArticle, relatedArticles, getAuthor, CATEGORIES, formatDate, formatDateTime, ARTICLES,
} from "@/lib/site-data";
import { CategoryChip, ArticleCard } from "@/components/site/article-card";
import { AuthorChip } from "@/components/site/author-chip";
import { ShareButtons } from "@/components/site/share-buttons";
import { BookmarkButton } from "@/components/site/bookmark-button";
import { CommentSection } from "@/components/site/comment-section";
import { ReadingProgress } from "@/components/site/reading-progress";
import { AdSlot } from "@/components/site/ad-slot";
import { Clock, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/article/$slug")({
  
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — Habari Leo` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/article/${params.slug}` },
        { property: "og:image", content: article.image },
        { name: "twitter:image", content: article.image },
        { name: "article:published_time", content: article.publishedAt },
        { name: "article:section", content: article.category },
      ],
      links: [{ rel: "canonical", href: `/article/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: getAuthor(article.authorSlug).name },
          image: [article.image],
          articleSection: article.category,
          description: article.excerpt,
        }),
      }],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Article not found</h1>
      <Link to="/" className="mt-4 inline-block text-aqua hover:underline">Back to home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-page py-20 text-center">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="mt-4 underline">Try again</button>
    </div>
  ),
});

/** Renders the markdown-lite paragraph format used in our data layer. */
function renderBody(paragraphs: string[]) {
  return paragraphs.map((p, i) => {
    if (p.startsWith("## ")) return <h2 key={i}>{p.replace(/^##\s+/, "")}</h2>;
    if (p.startsWith("> ")) return <blockquote key={i}>{p.replace(/^>\s+/, "")}</blockquote>;
    if (p.startsWith("- ")) return null; // simple skip; not used heavily
    return <p key={i}>{p}</p>;
  });
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const author = getAuthor(article.authorSlug);
  const cat = CATEGORIES.find((c) => c.slug === article.category)!;
  const related = relatedArticles(article);
  const idx = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = ARTICLES[idx - 1];
  const next = ARTICLES[idx + 1];

  return (
    <>
      <ReadingProgress />
      <article className="container-page py-8 md:py-12 max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-orange">Home</Link> {" / "}
          <Link to="/category/$slug" params={{ slug: cat.slug }} className="hover:text-orange">{cat.name}</Link>
        </nav>

        <div className="mb-4"><CategoryChip slug={cat.slug} name={cat.name} accent={cat.accent} /></div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight">{article.title}</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">{article.subtitle}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <AuthorChip author={author} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDateTime(article.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readingMinutes} min read</span>
            <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {article.views.toLocaleString()} views</span>
          </div>
        </div>

        <figure className="my-6 -mx-4 sm:mx-0">
          <img src={article.image} alt={article.imageAlt}
            className="w-full aspect-[16/10] object-cover sm:rounded-xl shadow-card" />
          <figcaption className="mt-2 px-4 sm:px-0 text-xs text-muted-foreground">{article.imageAlt}</figcaption>
        </figure>

        <div className="prose-article">{renderBody(article.body)}</div>

        <div className="my-8">
          <AdSlot label="In-Article Ad · 728×90" height={120} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t: string) => (
              <Link key={t} to="/search" search={{ q: t } as never}
                className="chip bg-muted text-muted-foreground hover:bg-accent">
                #{t}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <BookmarkButton slug={article.slug} />
            <ShareButtons url={`/article/${article.slug}`} title={article.title} />
          </div>
        </div>

        {/* Author bio card */}
        <section className="mt-10 rounded-xl border border-border bg-card p-6 flex gap-5 items-start">
          <AuthorChip author={author} large />
          <div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{author.bio}</p>
            <Link to="/author/$slug" params={{ slug: author.slug }} className="mt-3 inline-block text-sm font-semibold text-aqua hover:underline">
              More from {author.name.split(" ")[0]} →
            </Link>
          </div>
        </section>

        {/* Prev / next nav */}
        <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Article navigation">
          {prev ? (
            <Link to="/article/$slug" params={{ slug: prev.slug }}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:border-orange transition-colors">
              <ChevronLeft className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">Previous</span>
                <span className="block font-display font-semibold mt-1 line-clamp-2 group-hover:text-orange">{prev.title}</span>
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/article/$slug" params={{ slug: next.slug }}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:border-orange transition-colors sm:text-right">
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">Next</span>
                <span className="block font-display font-semibold mt-1 line-clamp-2 group-hover:text-orange">{next.title}</span>
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            </Link>
          ) : <div />}
        </nav>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display font-extrabold text-2xl mb-5">Related stories</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}

        <CommentSection initial={article.comments} />
      </article>
    </>
  );
}
