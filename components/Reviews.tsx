import Link from "next/link";
import { averageRating, displayName, type Review } from "@/lib/schema";
import { siteConfig } from "@/site.config";
import { Icon } from "@/components/ui/Icon";

export function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex text-tin" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} className={i < Math.round(rating) ? "" : "opacity-25"} />
      ))}
    </span>
  );
}

export function ReviewCard({ review, dark = false }: { review: Review; dark?: boolean }) {
  return (
    <figure className={`flex h-full flex-col gap-4 p-6 ${dark ? "card-dark" : "card"}`}>
      <Stars rating={review.rating} />
      <blockquote className={`flex-1 text-[15.5px] leading-relaxed ${dark ? "text-white/85" : "text-text"}`}>
        <p>&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <figcaption className={`text-[14px] ${dark ? "text-white/70" : "text-mute"}`}>
        <b className={dark ? "text-white" : "text-navy"}>{displayName(review.author)}</b> · Posted on Google
      </figcaption>
    </figure>
  );
}

/** Rating summary computed from content/reviews.json. */
export function RatingSummary({ dark = false }: { dark?: boolean }) {
  const { googleRating, googleCount } = siteConfig.reviews;
  const rating = googleRating ?? averageRating();
  if (!rating) return null;
  const label = googleRating && googleCount ? `${googleRating.toFixed(1)} from ${googleCount}+ Google reviews` : `${rating.toFixed(1)} star reviews on Google`;
  const inner = (
    <span className="inline-flex items-center gap-2.5">
      <Stars rating={rating} size={18} />
      <span className={`text-[15px] font-semibold ${dark ? "text-white" : "text-navy"}`}>{label}</span>
    </span>
  );
  return siteConfig.reviews.googleProfileUrl ? (
    <a href={siteConfig.reviews.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{inner}</a>
  ) : (
    <Link href="/reviews" className="hover:underline">{inner}</Link>
  );
}
