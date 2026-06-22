import { Link } from "@tanstack/react-router";
import type { Author } from "@/lib/site-data";

/** Author byline block shown above article bodies and on author pages. */
export function AuthorChip({ author, large = false }: { author: Author; large?: boolean }) {
  return (
    <Link to="/author/$slug" params={{ slug: author.slug }} className={`flex items-center gap-3 group ${large ? "" : ""}`}>
      <span className={`grid place-items-center rounded-full bg-primary text-primary-foreground font-bold ${large ? "h-14 w-14 text-base" : "h-10 w-10 text-sm"}`}>
        {author.initials}
      </span>
      <div className="min-w-0">
        <p className={`font-display font-bold leading-tight group-hover:text-orange transition-colors ${large ? "text-lg" : "text-sm"}`}>
          {author.name}
        </p>
        <p className="text-xs text-muted-foreground">{author.role}</p>
      </div>
    </Link>
  );
}
