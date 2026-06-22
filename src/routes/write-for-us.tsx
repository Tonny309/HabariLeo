import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/write-for-us")({
  head: () => ({
    meta: [
      { title: "Write For Us — Habari Leo" },
      { name: "description", content: "Pitch a story to Habari Leo. We commission features, opinion and explainers from contributors across Kenya and the region." },
      { property: "og:title", content: "Write For Us — Habari Leo" },
      { property: "og:url", content: "/write-for-us" },
    ],
    links: [{ rel: "canonical", href: "/write-for-us" }],
  }),
  component: WriteForUsPage,
});

function WriteForUsPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <p className="chip bg-orange text-orange-foreground w-fit">For contributors</p>
      <h1 className="font-display font-extrabold text-3xl md:text-5xl mt-3">Write for Habari Leo</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        We commission opinion, features, explainers and reported essays from journalists, academics, founders and
        practitioners with deep expertise in their fields.
      </p>

      <div className="prose-article mt-8">
        <h2>What we're looking for</h2>
        <p>
          The strongest pitches tell us something we don't already know, take a position we can stand behind and bring
          authority that only the writer can offer. We publish original work only — no syndicated or AI-generated copy.
        </p>
        <ul>
          <li>Opinion: 700–900 words on a current Kenyan policy or business debate.</li>
          <li>Features: 1,200–2,500 words on a reported story with at least three primary sources.</li>
          <li>Explainers: 800–1,200 words unpacking a complex topic for a general audience.</li>
        </ul>

        <h2>How to pitch</h2>
        <p>
          Send a one-paragraph pitch with your headline idea, the angle, why it matters now, three lines on your access
          to sources and two links to relevant past work. Include a short bio (50 words) and a high-resolution headshot.
        </p>

        <h2>Rates &amp; rights</h2>
        <p>
          We pay competitive rates on publication, agreed in writing before commission. Habari Leo retains first-publication
          rights for thirty days; contributors retain copyright thereafter and may republish with attribution.
        </p>

        <h2>Standards</h2>
        <p>
          All contributors must agree to our <a href="/editorial-policy">editorial policy</a>, including disclosure of
          potential conflicts of interest. We do not publish content that conceals undisclosed paid relationships.
        </p>
      </div>

      <div className="mt-10 rounded-xl bg-surface p-6">
        <h2 className="font-display font-bold text-xl">Ready to pitch?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Email the relevant section editor or send to <a href="mailto:pitches@habarileo.co.ke" className="text-aqua hover:underline">pitches@habarileo.co.ke</a>.
          Please allow up to ten working days for a response.
        </p>
        <Button asChild className="mt-4 bg-orange text-orange-foreground hover:opacity-90">
          <a href="mailto:pitches@habarileo.co.ke?subject=Pitch:%20">Send your pitch</a>
        </Button>
      </div>
    </div>
  );
}
