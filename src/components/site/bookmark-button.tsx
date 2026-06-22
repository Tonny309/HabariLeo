import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/use-bookmarks";

/** Toggle button that bookmarks the article in localStorage. */
export function BookmarkButton({ slug }: { slug: string }) {
  const { has, toggle } = useBookmarks();
  const active = has(slug);
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={() => toggle(slug)}
      className={active ? "bg-orange text-orange-foreground hover:opacity-90" : ""}
      aria-pressed={active}
    >
      {active ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      <span>{active ? "Saved" : "Save"}</span>
    </Button>
  );
}
