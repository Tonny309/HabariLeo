import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Habari Leo" },
      { name: "description", content: "Important disclaimers regarding the information published on Habari Leo." },
      { property: "og:title", content: "Disclaimer — Habari Leo" },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-5xl">Disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2026</p>

      <div className="prose-article mt-8">
        <h2>General information</h2>
        <p>
          The information on this website is provided in good faith and for general informational purposes only.
          Habari Leo makes no representation or warranty, express or implied, regarding the accuracy, adequacy,
          validity, reliability or completeness of any information on this site.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Articles on Habari Leo do not constitute professional advice. Information related to legal, financial,
          medical or other specialist topics should not be relied upon as a substitute for advice from a qualified
          professional in the relevant field. Always seek professional guidance before acting on any information you
          read on this site.
        </p>

        <h2>External links</h2>
        <p>
          Our website may contain links to other websites or content belonging to or originating from third parties.
          Habari Leo does not investigate, monitor or check such external links for accuracy, adequacy, validity or
          completeness.
        </p>

        <h2>Opinions and contributions</h2>
        <p>
          Opinion pieces and contributions from external writers reflect the views of the author and do not
          necessarily represent the views of Habari Leo or its staff.
        </p>

        <h2>Errors and omissions</h2>
        <p>
          While we strive to publish accurate information, errors may occur. If you spot an error, please contact our
          corrections desk at <a href="mailto:corrections@habarileo.co.ke">corrections@habarileo.co.ke</a>.
        </p>

        <h2>Consent</h2>
        <p>
          By using our website, you consent to our disclaimer and agree to its terms.
        </p>
      </div>
    </div>
  );
}
