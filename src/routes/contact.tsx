import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SITE } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Habari Leo" },
      { name: "description", content: "Get in touch with the Habari Leo newsroom — tips, corrections, partnerships and general enquiries." },
      { property: "og:title", content: "Contact Us — Habari Leo" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="container-page py-10 md:py-14 max-w-5xl">
      <header className="mb-10">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl">Contact us</h1>
        <p className="mt-3 text-lg text-muted-foreground">Tips, story leads, corrections and partnerships — we read everything.</p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <aside className="rounded-xl bg-surface p-6 space-y-5">
          <Info icon={<MapPin className="h-4 w-4" />} label="Newsroom" value={SITE.address} />
          <Info icon={<Mail className="h-4 w-4" />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
          <Info icon={<Phone className="h-4 w-4" />} label="Phone" value={SITE.phone} href={`tel:${SITE.phone}`} />
          <div className="pt-4 border-t border-border">
            <h3 className="font-display font-bold mb-2">Specialist desks</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>News tips: <a href={`mailto:tips@habarileo.co.ke`} className="text-aqua hover:underline">tips@habarileo.co.ke</a></li>
              <li>Corrections: <a href={`mailto:corrections@habarileo.co.ke`} className="text-aqua hover:underline">corrections@habarileo.co.ke</a></li>
              <li>Advertising: <a href={`mailto:ads@habarileo.co.ke`} className="text-aqua hover:underline">ads@habarileo.co.ke</a></li>
            </ul>
          </div>
        </aside>

        {sent ? (
          <div className="rounded-xl border border-aqua/40 bg-aqua/10 p-6 flex items-start gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange text-orange-foreground">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">Message received</h2>
              <p className="text-sm text-muted-foreground mt-1">Thanks for reaching out. Our team responds within one business day.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" required />
              <Field id="email" type="email" label="Email" required />
            </div>
            <Field id="subject" label="Subject" required />
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
              <textarea id="message" rows={5} required minLength={10} maxLength={2000}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-y" />
            </div>
            <Button type="submit" className="bg-orange text-orange-foreground hover:opacity-90">Send message</Button>
          </form>
        )}
      </div>
    </div>
  );
}

function Info({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {href ? <a href={href} className="text-sm font-semibold hover:text-orange break-words">{value}</a>
              : <p className="text-sm font-semibold break-words">{value}</p>}
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", required }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1">{label}</label>
      <input id={id} name={id} type={type} required={required} maxLength={200}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
