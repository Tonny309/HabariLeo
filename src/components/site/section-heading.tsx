/**
 * Section heading with optional "view all" link, used across the home page.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  accent?: "brand" | "aqua" | "orange";
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeading({ title, accent = "brand", viewAllHref, viewAllLabel = "View all" }: SectionHeadingProps) {
  const accentMap = { brand: "bg-primary", aqua: "bg-aqua", orange: "bg-orange" };
  return (
    <div className="flex items-end justify-between gap-4 mb-5 border-b border-border pb-2">
      <h2 className="relative font-display font-extrabold text-2xl md:text-[1.6rem] tracking-tight">
        <span className={`absolute -bottom-[9px] left-0 h-1 w-16 ${accentMap[accent]} rounded-full`} />
        {title}
      </h2>
      {viewAllHref && (
        <Link to={viewAllHref} className="text-sm font-medium text-aqua hover:underline flex items-center gap-1 shrink-0">
          {viewAllLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
