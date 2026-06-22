import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { AUTHORS, articlesByAuthor } from "@/lib/site-data";
import { ArticleCard } from "@/components/site/article-card";
import { Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/author/$slug")({
  loader: ({ params }) => {
    const author = AUTHORS.find((a) => a.slug === params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { author } = loaderData;
    return {
      meta: [
        { title: `${author.name} — ${author.role} — Habari Leo` },
        { name: "description", content: author.bio },
        { property: "og:title", content: `${author.name} — Habari Leo` },
        { property: "og:description", content: author.bio },
        { property: "og:url", content: `/author/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/author/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Author not found</h1>
      <Link to="/authors" className="mt-4 inline-block text-aqua hover:underline">View all authors</Link>
    </div>
  ),
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const posts = articlesByAuthor(author.slug);

  return (
    <div className="container-page py-8 md:py-12">
      <header className="rounded-2xl bg-surface p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground font-display text-3xl font-extrabold shrink-0">
          {author.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="chip bg-orange text-orange-foreground w-fit">{author.role}</p>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl mt-2">{author.name}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">{author.bio}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {author.expertise.map((e: string) => (
              <span key={e} className="chip bg-muted text-muted-foreground">{e}</span>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              {author.twitter && (
                <a href={author.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-aqua hover:text-aqua-foreground hover:border-aqua">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-aqua hover:text-aqua-foreground hover:border-aqua">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-display font-extrabold text-2xl mb-5">{posts.length} articles by {author.name.split(" ")[0]}</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No articles yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </section>
    </div>
  );
}
