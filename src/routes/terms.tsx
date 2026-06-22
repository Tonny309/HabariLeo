import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Habari Leo" },
      { name: "description", content: "The terms governing your use of habarileo.co.ke and related services." },
      { property: "og:title", content: "Terms & Conditions — Habari Leo" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-5xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">Effective date: January 1, 2026</p>

      <div className="prose-article mt-8">
        <p>
          These terms govern your access to and use of habarileo.co.ke and any related services (the "Service")
          operated by Habari Leo Media Limited. By using the Service you agree to be bound by these terms.
        </p>

        <h2>1. Use of the service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in a manner that does not infringe the rights of,
          restrict, or inhibit the use and enjoyment of the Service by any third party.
        </p>

        <h2>2. Intellectual property</h2>
        <p>
          All content on the Service — including articles, photographs, video, graphics and logos — is the property of
          Habari Leo Media Limited or its licensors and is protected by Kenyan and international copyright laws. You
          may share short excerpts with attribution and a link back to the original article; bulk republication
          requires written permission.
        </p>

        <h2>3. User contributions</h2>
        <p>
          When you post a comment or contribute content, you grant Habari Leo a non-exclusive, royalty-free, worldwide
          licence to use, reproduce, edit and publish that contribution. You warrant that your contribution does not
          infringe any third-party rights.
        </p>

        <h2>4. Community standards</h2>
        <p>
          Comments must comply with our community guidelines: no hate speech, harassment, defamation, spam or
          unlawful content. We reserve the right to remove contributions and suspend accounts at our discretion.
        </p>

        <h2>5. Third-party links</h2>
        <p>
          The Service may contain links to third-party websites. We are not responsible for the content or practices
          of those websites and recommend you review their own terms and privacy policies.
        </p>

        <h2>6. Disclaimer of warranties</h2>
        <p>
          The Service is provided on an "as is" basis. To the extent permitted by law, we disclaim all warranties,
          express or implied, including the implied warranties of merchantability and fitness for a particular purpose.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Habari Leo will not be liable for any indirect, incidental, special
          or consequential damages arising out of or in connection with your use of the Service.
        </p>

        <h2>8. Governing law</h2>
        <p>
          These terms are governed by the laws of Kenya. Disputes arising under these terms shall be subject to the
          exclusive jurisdiction of the courts of Kenya.
        </p>

        <h2>9. Changes to these terms</h2>
        <p>
          We may revise these terms from time to time. The most current version will always be posted on this page.
          Material changes will be flagged on the homepage for at least seven days.
        </p>
      </div>
    </div>
  );
}
