import { createFileRoute, Link } from "@tanstack/react-router";
import { AUTHORS, articlesByAuthor } from "@/lib/site-data";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Our Journalists — Habari Leo" },
      { name: "description", content: "Meet the reporters, editors and contributors behind Habari Leo." },
      { property: "og:title", content: "Our Journalists — Habari Leo" },
      { property: "og:url", content: "/authors" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  component: AuthorsIndex,
});

function AuthorsIndex() {
  return (
    <div className="container-page py-8 md:py-12">
      <header className="mb-10">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl">Our journalists</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A small but seasoned team of reporters and editors covering the stories that matter across Kenya and East Africa.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AUTHORS.map((a) => (
          <Link key={a.slug} to="/author/$slug" params={{ slug: a.slug }}
            className="group rounded-xl border border-border bg-card p-6 card-hover">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                {a.initials}
              </span>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-lg group-hover:text-orange transition-colors">{a.name}</h2>
                <p className="text-xs text-muted-foreground">{a.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{a.bio}</p>
            <p className="mt-4 text-xs uppercase tracking-wider text-aqua">{articlesByAuthor(a.slug).length} articles</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
