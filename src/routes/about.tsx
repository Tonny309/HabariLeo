import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, AUTHORS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Habari Leo" },
      { name: "description", content: "Habari Leo is an independent Kenyan digital newsroom. Learn about our mission, history and editorial standards." },
      { property: "og:title", content: "About Us — Habari Leo" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page py-10 md:py-14 max-w-4xl">
      <header className="mb-10">
        <p className="chip bg-orange text-orange-foreground w-fit">About us</p>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl mt-3">An independent newsroom for a confident Kenya</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{SITE.description}</p>
      </header>

      <div className="prose-article">
        <h2>Our mission</h2>
        <p>
          Habari Leo exists to inform, hold power to account and celebrate the ideas, businesses and individuals shaping
          modern Kenya. We believe that an informed public is the foundation of a thriving democracy and a vibrant
          economy, and that every Kenyan deserves access to fast, fair and rigorously reported news.
        </p>

        <h2>How we started</h2>
        <p>
          Founded in Nairobi in 2019 by a small group of veteran journalists, Habari Leo began as a weekly newsletter
          covering politics and business. Today we publish dozens of stories every day across seven sections, reaching
          more than four million unique readers each month across web, mobile and social platforms.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Our newsroom is editorially independent from our commercial operations. We accept no financial inducements
          from political parties or advertisers in exchange for coverage, and we publish a full <Link to="/editorial-policy">editorial policy</Link>
          outlining our standards for sourcing, corrections and conflicts of interest.
        </p>

        <h2>Our team</h2>
        <p>
          Habari Leo is built by reporters who live in the communities they cover. We have journalists based in Nairobi,
          Mombasa, Kisumu, Eldoret and Nakuru, with regular contributors in Kampala, Dar es Salaam and Kigali.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-display font-extrabold text-2xl mb-5">Meet the desk</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTHORS.map((a) => (
            <Link key={a.slug} to="/author/$slug" params={{ slug: a.slug }}
              className="rounded-lg border border-border bg-card p-4 flex items-center gap-3 card-hover">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                {a.initials}
              </span>
              <div className="min-w-0">
                <p className="font-display font-bold truncate">{a.name}</p>
                <p className="text-xs text-muted-foreground truncate">{a.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
