/**
 * Bookmark storage hook (localStorage-backed).
 */
import { useCallback, useEffect, useState } from "react";

const KEY = "habarileo.bookmarks";

const read = (): string[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => { setBookmarks(read()); }, []);

  const toggle = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((slug: string) => bookmarks.includes(slug), [bookmarks]);

  return { bookmarks, toggle, has };
}
