/**
 * Reading progress bar that tracks scroll position within the article body.
 * Mounted at the top of the article route.
 */
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? Math.min(100, Math.max(0, (h.scrollTop / total) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-16 h-1 z-40 pointer-events-none" aria-hidden>
      <div className="h-full bg-orange transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}
