import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Habari Leo" },
      { name: "description", content: "How Habari Leo collects, uses and protects personal data in line with Kenya's Data Protection Act 2019." },
      { property: "og:title", content: "Privacy Policy — Habari Leo" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Effective date: January 1, 2026</p>

      <div className="prose-article mt-8">
        <p>
          This policy explains how Habari Leo Media Limited ("we", "us", "Habari Leo") collects, uses and protects
          personal information when you use habarileo.co.ke and our related services. We are committed to handling
          your data lawfully and in line with the Kenya Data Protection Act, 2019.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          We collect information you provide directly (such as when you subscribe to our newsletter, post a comment or
          contact our newsroom), as well as information automatically collected through cookies and analytics tools
          (device type, browser, approximate location, pages viewed).
        </p>

        <h2>2. How we use information</h2>
        <p>
          We use information to deliver and improve our services, send newsletters you have requested, moderate
          comments, measure audience trends and detect abuse. We do not sell your personal data to third parties.
        </p>

        <h2>3. Legal basis</h2>
        <p>
          We process personal data on the basis of your consent (newsletter subscription, cookies), the performance of
          a contract (where applicable), our legitimate interests (audience analytics) and compliance with legal
          obligations.
        </p>

        <h2>4. Sharing of information</h2>
        <p>
          We share data with carefully selected processors who help us operate the site (hosting, analytics, email
          delivery). These providers are bound by written agreements and may only use data on our instructions. We
          may also disclose information when required by law.
        </p>

        <h2>5. Retention</h2>
        <p>
          We retain personal data only for as long as it is needed for the purposes set out in this policy. Newsletter
          subscribers may unsubscribe at any time using the link in any email.
        </p>

        <h2>6. Your rights</h2>
        <p>
          You have the right to access, correct, erase or restrict the processing of your personal data, and to object
          to processing or request portability. To exercise these rights, contact us at
          <a href="mailto:privacy@habarileo.co.ke"> privacy@habarileo.co.ke</a>.
        </p>

        <h2>7. International transfers</h2>
        <p>
          Where personal data is transferred outside Kenya, we ensure adequate safeguards are in place, including
          standard contractual clauses with our processors.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update this policy from time to time. Significant changes will be notified via a banner on our
          website and, where appropriate, by email.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy questions or complaints, contact the Data Protection Officer at
          <a href="mailto:privacy@habarileo.co.ke"> privacy@habarileo.co.ke</a> or write to Habari Leo Media Limited,
          Westlands Office Park, 3rd Floor, Waiyaki Way, Nairobi.
        </p>
      </div>
    </div>
  );
}
