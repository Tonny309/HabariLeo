import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, Newspaper } from "lucide-react";
import { SITE, CATEGORIES } from "@/lib/site-data";
import { NewsletterSignup } from "./newsletter-signup";

/** Comprehensive footer with quick, legal, content and social link groups. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-orange text-orange-foreground">
                <Newspaper className="h-5 w-5" />
              </span>
              Habari<span className="text-orange">Leo</span>
            </Link>
            <p className="mt-3 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              {SITE.description}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {SITE.address}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <a href={`mailto:${SITE.email}`} className="hover:text-orange">{SITE.email}</a></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {SITE.phone}</li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <SocialIcon href={SITE.social.facebook} label="Facebook"><Facebook className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={SITE.social.twitter} label="X (Twitter)"><Twitter className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={SITE.social.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={SITE.social.linkedin} label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
            </div>
          </div>

          <FooterCol title="Sections">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/news">All News</FooterLink>
            {CATEGORIES.slice(1).map((c) => (
              <FooterLinkCat key={c.slug} slug={c.slug}>{c.name}</FooterLinkCat>
            ))}
            <FooterLink to="/authors">Authors</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/editorial-policy">Editorial Policy</FooterLink>
            <FooterLink to="/advertise">Advertise With Us</FooterLink>
            <FooterLink to="/write-for-us">Write For Us</FooterLink>
          </FooterCol>

          <FooterCol title="Stay updated">
            <p className="text-sm text-primary-foreground/70 -mt-2 mb-3">
              Get the morning briefing in your inbox by 7am, every weekday.
            </p>
            <NewsletterSignup compact />
          </FooterCol>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-xs text-primary-foreground/70">
          <p>© {year} Habari Leo Media Limited. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-orange">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange">Terms &amp; Conditions</Link>
            <Link to="/cookies" className="hover:text-orange">Cookie Policy</Link>
            <Link to="/disclaimer" className="hover:text-orange">Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/90">{title}</h3>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-primary-foreground/75 hover:text-orange transition-colors">
        {children}
      </Link>
    </li>
  );
}

function FooterLinkCat({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to="/category/$slug" params={{ slug }} className="text-primary-foreground/75 hover:text-orange transition-colors">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/15 hover:bg-orange hover:border-orange hover:text-orange-foreground transition-colors"
    >
      {children}
    </a>
  );
}
