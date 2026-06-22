import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES, CATEGORIES, AUTHORS } from "@/lib/site-data";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "hourly", priority: "1.0" },
          { path: "/news", changefreq: "hourly", priority: "0.9" },
          { path: "/categories", changefreq: "weekly", priority: "0.7" },
          { path: "/authors", changefreq: "weekly", priority: "0.6" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/advertise", changefreq: "monthly", priority: "0.4" },
          { path: "/write-for-us", changefreq: "monthly", priority: "0.4" },
          { path: "/editorial-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
          ...CATEGORIES.map((c) => ({ path: `/category/${c.slug}`, changefreq: "daily" as const, priority: "0.8" })),
          ...AUTHORS.map((a) => ({ path: `/author/${a.slug}`, changefreq: "weekly" as const, priority: "0.5" })),
          ...ARTICLES.map((a) => ({ path: `/article/${a.slug}`, lastmod: a.publishedAt, changefreq: "weekly" as const, priority: "0.7" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
