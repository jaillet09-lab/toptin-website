import Image from "next/image";

/**
 * The real Top Tin logo artwork (never redrawn or recoloured).
 * positive: navy + yellow, for light backgrounds. reversed: white + yellow, for navy.
 * The PNGs are 1000x200 with the artwork spanning most of the height.
 */
export function Logo({ variant = "positive", height = 40, priority = false, className = "" }: { variant?: "positive" | "reversed"; height?: number; priority?: boolean; className?: string }) {
  const src = variant === "reversed" ? "/brand/toptin-logo-reversed.png" : "/brand/toptin-logo-transparent.png";
  return (
    <Image
      src={src}
      alt="Top Tin Roofing"
      width={Math.round(height * 5)}
      height={height}
      priority={priority}
      className={`block h-auto ${className}`.trim()}
      style={{ height, width: "auto" }}
    />
  );
}
