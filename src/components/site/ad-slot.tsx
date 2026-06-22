/**
 * Realistic ad placeholder used across the site. Visually distinguished but
 * styled to feel intentional rather than broken.
 */
interface AdSlotProps {
  label?: string;
  height?: number;
  variant?: "default" | "banner";
}

export function AdSlot({ label = "Advertisement", height = 120, variant = "default" }: AdSlotProps) {
  const isBanner = variant === "banner";
  return (
    <div
      className={`relative grid place-items-center rounded-lg border border-dashed border-border bg-surface text-center overflow-hidden ${isBanner ? "py-8 px-4" : ""}`}
      style={isBanner ? undefined : { minHeight: height }}
      aria-label="Advertisement"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Sponsored</p>
        <p className="font-display font-bold text-base md:text-lg text-foreground/80">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">Advertise with Habari Leo — reach 4M monthly readers</p>
      </div>
    </div>
  );
}
