import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

/**
 * Newsletter signup form with optimistic success state (no backend call).
 */
export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <div className={`flex items-start gap-3 rounded-lg ${compact ? "bg-primary-foreground/10 p-3" : "bg-aqua/15 p-4"}`}>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-orange-foreground shrink-0">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="font-semibold text-sm">You're subscribed!</p>
          <p className="text-xs opacity-80">Look out for our briefing in your inbox tomorrow morning.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex ${compact ? "flex-col gap-2" : "flex-col sm:flex-row gap-3"}`}>
      <label htmlFor={compact ? "nl-compact" : "nl-email"} className="sr-only">Email address</label>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          id={compact ? "nl-compact" : "nl-email"}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-md border border-input bg-card text-card-foreground pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <Button type="submit" className="bg-orange text-orange-foreground hover:opacity-90">
        Subscribe
      </Button>
    </form>
  );
}
