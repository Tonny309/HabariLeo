import { Link } from "@tanstack/react-router";
import { Search, Menu, X, Moon, Sun, Newspaper } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, SITE } from "@/lib/site-data";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

/**
 * Sticky site header with logo, primary nav, search and dark-mode toggle.
 * Includes a mobile drawer that mirrors all desktop navigation.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const Logo = (
    <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <Newspaper className="h-5 w-5" />
      </span>
      <span className="leading-none">
        Habari<span className="text-orange">Leo</span>
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <div className="container-page flex h-16 items-center gap-4">
        {Logo}

        <nav className="hidden lg:flex items-center gap-1 ml-6 text-sm font-medium">
          <Link to="/" activeOptions={{ exact: true }} className="px-3 py-2 rounded-md hover:bg-muted transition-colors" activeProps={{ className: "text-orange" }}>
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
              activeProps={{ className: "text-orange" }}
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Inline search */}
      {searchOpen && (
        <div className="border-t border-border bg-background">
          <form
            className="container-page py-3"
            action="/search"
            method="get"
            onSubmit={() => setSearchOpen(false)}
          >
            <label htmlFor="header-search" className="sr-only">Search articles</label>
            <div className="flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                id="header-search"
                name="q"
                autoFocus
                placeholder="Search news, politics, business, sports..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" className="bg-orange text-orange-foreground hover:opacity-90">
                Search
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[88vw] bg-background border-l border-border shadow-pop p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              {Logo}
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 text-base font-medium">
              <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Home</Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-muted"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="my-3 h-px bg-border" />
              <Link to="/authors" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Authors</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Contact</Link>
              <Link to="/advertise" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Advertise</Link>
            </nav>
            <p className="mt-8 text-xs text-muted-foreground">{SITE.tagline}</p>
          </div>
        </div>
      )}
    </header>
  );
}
