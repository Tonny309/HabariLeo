import { Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/** Article social sharing row. WhatsApp + native social + copy link. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState(url);

  // Resolve absolute URL after mount to avoid SSR hydration mismatch.
  useEffect(() => { setFullUrl(`${window.location.origin}${url}`); }, [url]);

  const enc = (s: string) => encodeURIComponent(s);

  const copy = async () => {
    try { await navigator.clipboard.writeText(fullUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Share</span>
      <Button size="icon" variant="outline" aria-label="Share on Facebook" asChild>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(fullUrl)}`} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button size="icon" variant="outline" aria-label="Share on X" asChild>
        <a href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(fullUrl)}`} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button size="icon" variant="outline" aria-label="Share on LinkedIn" asChild>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(fullUrl)}`} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button size="icon" variant="outline" aria-label="Share on WhatsApp" asChild>
        <a href={`https://wa.me/?text=${enc(title + " " + fullUrl)}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4" />
        </a>
      </Button>
      <Button size="icon" variant="outline" aria-label="Copy link" onClick={copy}>
        <LinkIcon className="h-4 w-4" />
      </Button>
      {copied && <span className="text-xs text-aqua">Link copied</span>}
    </div>
  );
}
