/**
 * Top Tin Roofing logo (docs/BRAND.md, "Logo"). Vector artwork in public/brand.
 *
 *   <Logo />                       primary, full colour, for white and light grounds
 *   <Logo variant="reversed" />    primary, white and yellow, for Navy 700 and Navy 900 grounds
 *   <Logo layout="stacked" />      secondary, for square and narrow spaces
 *   <Logo layout="icon" />         the roof mark alone
 *
 * `height` is the visible height in px. The files are cropped tight to the artwork, so the width
 * follows from the file's own proportions and nothing needs trimming.
 */
type Layout = "primary" | "stacked" | "icon";

const RATIO: Record<Layout, number> = { primary: 841.5 / 170.75, stacked: 508.5 / 350.75, icon: 272.5 / 164 };
const FILE: Record<Layout, string> = { primary: "toptin-logo-primary", stacked: "toptin-logo-stacked", icon: "toptin-icon" };

export function Logo({ variant = "positive", layout = "primary", height = 40, priority = false, className = "" }: { variant?: "positive" | "reversed"; layout?: Layout; height?: number; priority?: boolean; className?: string }) {
  const src = `/brand/${FILE[layout]}${variant === "reversed" ? "-reversed" : ""}.svg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Top Tin Roofing"
      width={Math.round(height * RATIO[layout])}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      draggable={false}
      className={`block ${className}`.trim()}
      style={{ height, width: "auto", maxWidth: "none" }}
    />
  );
}
