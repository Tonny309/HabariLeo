import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Comment } from "@/lib/site-data";
import { MessageCircle, CornerDownRight } from "lucide-react";

/** Article comments section — supports nested replies and a new-comment form. */
export function CommentSection({ initial }: { initial: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");

  const initials = (n: string) =>
    n.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "U";

  const submitTop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || body.trim().length < 5) return;
    setComments((prev) => [
      { id: `new-${Date.now()}`, name: name.trim(), initials: initials(name), date: "Just now", body: body.trim(), replies: [] },
      ...prev,
    ]);
    setName(""); setBody("");
  };

  const submitReply = (commentId: string) => {
    if (!name.trim() || replyBody.trim().length < 3) return;
    setComments((prev) => prev.map((c) =>
      c.id === commentId
        ? { ...c, replies: [...(c.replies ?? []), { id: `r-${Date.now()}`, name: name.trim(), initials: initials(name), date: "Just now", body: replyBody.trim() }] }
        : c,
    ));
    setReplyBody(""); setReplyTo(null);
  };

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <h2 id="comments-heading" className="font-display font-extrabold text-2xl flex items-center gap-2 mb-1">
        <MessageCircle className="h-5 w-5 text-orange" /> Comments
        <span className="text-base text-muted-foreground font-normal">({comments.length})</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Join the conversation. Be respectful and keep contributions on topic.
      </p>

      <form onSubmit={submitTop} className="rounded-lg border border-border bg-card p-4 mb-8 space-y-3">
        <input
          aria-label="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          aria-label="Your comment"
          required
          minLength={5}
          maxLength={1000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Add to the discussion..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-y"
        />
        <div className="flex justify-end">
          <Button type="submit" className="bg-orange text-orange-foreground hover:opacity-90">Post comment</Button>
        </div>
      </form>

      <ul className="space-y-6">
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg border border-border bg-card p-4">
            <CommentHeader name={c.name} initials={c.initials} date={c.date} />
            <p className="mt-2 text-[15px] leading-relaxed">{c.body}</p>
            <button
              type="button"
              onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
              className="mt-2 text-xs font-semibold text-aqua hover:underline"
            >
              {replyTo === c.id ? "Cancel" : "Reply"}
            </button>

            {c.replies && c.replies.length > 0 && (
              <ul className="mt-4 space-y-3 border-l-2 border-border pl-4">
                {c.replies.map((r) => (
                  <li key={r.id}>
                    <CommentHeader name={r.name} initials={r.initials} date={r.date} small />
                    <p className="mt-1 text-sm leading-relaxed flex gap-2">
                      <CornerDownRight className="h-4 w-4 text-muted-foreground mt-1 shrink-0" /> {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {replyTo === c.id && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={2}
                  placeholder={`Reply to ${c.name}…`}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-y"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => submitReply(c.id)}>Post reply</Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentHeader({ name, initials, date, small = false }: { name: string; initials: string; date: string; small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid place-items-center rounded-full bg-aqua text-aqua-foreground font-bold ${small ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm"}`}>
        {initials}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-sm leading-tight truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
