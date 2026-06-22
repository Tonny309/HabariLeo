import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — Habari Leo" },
      { name: "description", content: "Habari Leo's editorial standards, including sourcing, fact-checking, corrections and conflicts of interest." },
      { property: "og:title", content: "Editorial Policy — Habari Leo" },
      { property: "og:url", content: "/editorial-policy" },
    ],
    links: [{ rel: "canonical", href: "/editorial-policy" }],
  }),
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-5xl">Editorial Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last reviewed: January 2026</p>

      <div className="prose-article mt-8">
        <h2>Our commitments</h2>
        <p>
          Habari Leo publishes news, analysis and opinion in the public interest. Every member of our newsroom is bound
          by the standards below. We treat departures from these standards as a serious matter that may result in
          correction, retraction or termination.
        </p>

        <h2>Accuracy and sourcing</h2>
        <p>
          We verify facts before publication. Reported stories rely on named sources wherever possible. Anonymous
          sources are used only where there is a genuine public interest and where their information has been
          corroborated by at least one additional source or document.
        </p>

        <h2>Independence</h2>
        <p>
          Our journalists do not accept gifts, hospitality or financial benefits from individuals or organisations they
          cover. Commercial relationships have no influence over editorial decisions. Sponsored or branded content is
          clearly labelled as such.
        </p>

        <h2>Fairness</h2>
        <p>
          We give individuals and organisations who feature in critical coverage a meaningful opportunity to respond
          before publication. We do not publish material designed to humiliate or harass.
        </p>

        <h2>Corrections</h2>
        <p>
          When we make a factual error, we correct it promptly and transparently. Significant corrections are flagged
          with an editor's note at the top of the article. Send corrections to <a href="mailto:corrections@habarileo.co.ke">corrections@habarileo.co.ke</a>.
        </p>

        <h2>Conflicts of interest</h2>
        <p>
          Reporters disclose any financial, family or professional relationships that could create a perceived conflict.
          Where a conflict exists, the story is reassigned or a disclosure is added to the byline.
        </p>

        <h2>Generative AI</h2>
        <p>
          We do not publish AI-generated articles. We may use AI tools for transcription, translation and copy-editing
          assistance under human supervision, but every published word is reviewed and approved by a member of our
          editorial staff.
        </p>

        <h2>Reader contributions</h2>
        <p>
          Comments and contributions from readers are welcome. We moderate for civility, accuracy and relevance and
          reserve the right to remove content that breaches our community guidelines.
        </p>
      </div>
    </div>
  );
}
