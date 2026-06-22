import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Habari Leo" },
      { name: "description", content: "What cookies Habari Leo uses, what they do, and how you can manage them." },
      { property: "og:title", content: "Cookie Policy — Habari Leo" },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-5xl">Cookie Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2026</p>

      <div className="prose-article mt-8">
        <p>
          A cookie is a small text file stored on your device when you visit a website. Cookies help websites work
          efficiently and provide information to the site owners. Habari Leo uses cookies and similar technologies
          for the purposes set out below.
        </p>

        <h2>Strictly necessary cookies</h2>
        <p>
          These cookies are required for the site to function. They enable core features such as page navigation,
          maintaining your dark-mode preference and storing your saved articles. The site cannot function properly
          without these cookies and they cannot be switched off.
        </p>

        <h2>Performance and analytics cookies</h2>
        <p>
          We use analytics cookies to understand how readers interact with our content. This data is aggregated and
          helps us improve our journalism and user experience. We anonymise IP addresses where supported.
        </p>

        <h2>Functional cookies</h2>
        <p>
          These cookies remember choices you make such as language and region, and provide enhanced personalised
          features. They may be set by us or by third-party providers whose services we have added to our pages.
        </p>

        <h2>Advertising cookies</h2>
        <p>
          We use a limited number of advertising cookies to measure campaign performance and to prevent the same ad
          from being shown to the same person repeatedly. We do not use these cookies to build cross-site advertising
          profiles.
        </p>

        <h2>Managing your preferences</h2>
        <p>
          You can adjust cookie preferences in your browser settings at any time. Most browsers allow you to refuse
          new cookies, delete existing cookies, or be notified when new cookies are set. Note that disabling cookies
          may affect the functionality of our website.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about our use of cookies should be sent to
          <a href="mailto:privacy@habarileo.co.ke"> privacy@habarileo.co.ke</a>.
        </p>
      </div>
    </div>
  );
}
