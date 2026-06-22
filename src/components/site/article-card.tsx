import { Link } from "@tanstack/react-router";
import { Clock, MessageCircle } from "lucide-react";
import type { Article } from "@/lib/site-data";
import { CATEGORIES, getAuthor, formatDate } from "@/lib/site-data";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "large" | "compact" | "horizontal";
}

/**
 * Reusable article card with four density variants. Always renders as a Link
 * to the article detail page.
 */
export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const cat = CATEGORIES.find((c) => c.slug === article.category)!;
  const author = getAuthor(article.authorSlug);

  if (variant === "horizontal") {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group grid grid-cols-[7rem_1fr] gap-3 sm:grid-cols-[10rem_1fr] sm:gap-4 card-hover rounded-lg p-2"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
          <img src={article.image} alt={article.imageAlt} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="min-w-0 flex flex-col">
          <CategoryChip slug={cat.slug} name={cat.name} accent={cat.accent} />
          <h3 className="mt-1.5 font-display font-bold text-base leading-snug line-clamp-3 group-hover:text-orange transition-colors">
            {article.title}
          </h3>
          <div className="mt-auto pt-2 text-xs text-muted-foreground flex items-center gap-3">
            <span>{author.name.split(" ")[0]}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingMinutes} min</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group flex gap-3 py-3 border-b border-border last:border-0"
      >
        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
          <img src={article.image} alt={article.imageAlt} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-semibold text-sm leading-snug line-clamp-2 group-hover:text-orange transition-colors">
            {article.title}
          </h4>
          <p className="mt-1 text-[11px] text-muted-foreground uppercase tracking-wider">
            {cat.name} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group relative block aspect-[16/10] overflow-hidden rounded-xl bg-card shadow-card"
      >
        <img src={article.image} alt={article.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-white">
          <CategoryChip slug={cat.slug} name={cat.name} accent={cat.accent} onDark />
          <h2 className="mt-3 font-display font-extrabold text-2xl md:text-4xl leading-tight max-w-3xl group-hover:text-orange transition-colors">
            {article.title}
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/85 max-w-2xl line-clamp-2">
            {article.subtitle}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-white/80">
            <span>By {author.name}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingMinutes} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col rounded-lg bg-card border border-border overflow-hidden card-hover shadow-card"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img src={article.image} alt={article.imageAlt} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryChip slug={cat.slug} name={cat.name} accent={cat.accent} />
        <h3 className="font-display font-bold text-lg leading-snug line-clamp-2 group-hover:text-orange transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{author.name}</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingMinutes}m</span>
            <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {article.comments.length}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Coloured tag pill used to label a category. Renders as a span so it can
 *  safely sit inside another <a> (e.g. an ArticleCard Link). */
export function CategoryChip({
  name, accent, onDark = false,
}: { slug?: string; name: string; accent: "brand" | "aqua" | "orange"; onDark?: boolean }) {
  const colorMap = {
    brand: onDark ? "bg-white text-primary" : "bg-primary text-primary-foreground",
    aqua: "bg-aqua text-aqua-foreground",
    orange: "bg-orange text-orange-foreground",
  };
  return <span className={`chip ${colorMap[accent]} w-fit`}>{name}</span>;
}
