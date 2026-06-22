import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/advertise")({
  head: () => ({
    meta: [
      { title: "Advertise With Us — Habari Leo" },
      { name: "description", content: "Reach 4 million monthly readers across Kenya and East Africa with display, sponsored content and newsletter advertising." },
      { property: "og:title", content: "Advertise With Us — Habari Leo" },
      { property: "og:url", content: "/advertise" },
    ],
    links: [{ rel: "canonical", href: "/advertise" }],
  }),
  component: AdvertisePage,
});

const PACKAGES = [
  { name: "Display Network", price: "From Sh 80,000 / week",
    perks: ["Run-of-site banner placements", "Mobile and desktop", "Frequency capping", "Weekly performance dashboard"] },
  { name: "Sponsored Content", price: "From Sh 220,000 / article",
    perks: ["Editorially-written branded story", "Three-day homepage promotion", "Newsletter inclusion", "Lifetime SEO value"] },
  { name: "Newsletter Sponsorship", price: "From Sh 150,000 / drop",
    perks: ["Logo + 80-word slot", "240k+ subscriber base", "Open rate 38% average", "Trackable click-through"] },
];

function AdvertisePage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-5xl">
      <header className="mb-10">
        <p className="chip bg-aqua text-aqua-foreground w-fit">For brands &amp; agencies</p>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl mt-3">Advertise with Habari Leo</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Reach more than four million engaged monthly readers across Kenya and the wider East African region.
          Our audience over-indexes on decision-makers, professionals and a young, mobile-first urban demographic.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { stat: "4.2M", label: "Monthly unique readers" },
          { stat: "240k", label: "Newsletter subscribers" },
          { stat: "63%", label: "Aged 25–44" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-surface p-6 text-center">
            <p className="font-display font-extrabold text-4xl text-orange">{s.stat}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3 mb-12">
        {PACKAGES.map((p) => (
          <article key={p.name} className="rounded-xl border border-border bg-card p-6 flex flex-col">
            <h2 className="font-display font-bold text-xl">{p.name}</h2>
            <p className="mt-1 text-sm text-aqua font-semibold">{p.price}</p>
            <ul className="mt-4 space-y-2 text-sm flex-1">
              {p.perks.map((perk) => (
                <li key={perk} className="flex gap-2"><Check className="h-4 w-4 text-orange shrink-0 mt-0.5" /> {perk}</li>
              ))}
            </ul>
            <Button className="mt-6 bg-primary text-primary-foreground hover:opacity-90" asChild>
              <a href="mailto:ads@habarileo.co.ke?subject=Advertising%20enquiry">Request media kit</a>
            </Button>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl">Custom campaign?</h2>
        <p className="mt-2 text-primary-foreground/80 max-w-2xl">
          From always-on programmatic to integrated brand storytelling, our commercial team builds bespoke programmes
          for advertisers ranging from listed corporates to ambitious SMEs.
        </p>
        <Button className="mt-5 bg-orange text-orange-foreground hover:opacity-90" asChild>
          <a href="mailto:ads@habarileo.co.ke">Talk to our team</a>
        </Button>
      </section>
    </div>
  );
}
