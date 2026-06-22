import { Zap } from "lucide-react";
import { ARTICLES } from "@/lib/site-data";

/**
 * Marquee-style breaking news ticker. Duplicated content gives a seamless loop.
 */
export function BreakingTicker() {
  const items = ARTICLES.filter((a) => a.trending).slice(0, 6);
  const sequence = [...items, ...items];

  return (
    <div className="bg-primary text-primary-foreground border-b border-border overflow-hidden">
      <div className="container-page flex items-center gap-4 h-10">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-orange text-orange-foreground px-2.5 py-1 rounded-sm shrink-0">
          <Zap className="h-3 w-3 fill-current" /> Breaking
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex gap-10 whitespace-nowrap text-sm">
            {sequence.map((a, i) => (
              <span key={`${a.slug}-${i}`} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                <a href={`/article/${a.slug}`} className="hover:text-orange transition-colors">
                  {a.title}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
