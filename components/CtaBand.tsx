import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

/** Call band used on every page above the footer (and mid-page on long pages). */
export function CtaBand({
  title = "Ready for a new roof? Get a free quote.",
  text,
  service,
  suburb,
  tone = "gold",
}: {
  title?: string;
  text?: string;
  service?: string;
  suburb?: string;
  tone?: "gold" | "navy";
}) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (suburb) params.set("suburb", suburb);
  const href = params.toString() ? `/quote?${params.toString()}` : "/quote";
  const gold = tone === "gold";

  return (
    <section aria-label="Get a free quote" className={gold ? "bg-tin text-navy" : "on-dark bg-navy text-white"}>
      <div className="wrap flex flex-col gap-8 py-14 md:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[56ch]">
          <h2 className="display-md">{title}</h2>
          <p className={`mt-3 text-[16.5px] ${gold ? "text-navy/80" : "text-white/75"}`}>
            {text ?? `We come out, look at the roof and give you a written price. ${siteConfig.hours.label}.`}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link href={href} className={`btn btn-lg ${gold ? "btn-navy" : "btn-primary"}`}>
            Get a free quote
            <Icon name="arrow" size={18} />
          </Link>
          <TelLink location="cta-band" className={`btn btn-lg ${gold ? "btn-outline" : "btn-ghost"}`}>
            <Icon name="phone" size={18} />
            {siteConfig.phone}
          </TelLink>
        </div>
      </div>
      <div className={gold ? "border-t border-navy/15" : "border-t border-white/10"}>
        <ul className={`wrap flex flex-wrap gap-x-6 gap-y-2 py-4 text-[14.5px] font-semibold ${gold ? "text-navy" : "text-white/85"}`}>
          <li><Link href="/services/roof-replacement" className="hover:underline">Roof replacement</Link></li>
          <li><Link href="/services/colorbond-roof-installation" className="hover:underline">Colorbond roofing</Link></li>
          <li><Link href="/projects" className="hover:underline">Our projects</Link></li>
          <li><Link href="/reviews" className="hover:underline">Reviews</Link></li>
          <li><Link href="/how-it-works" className="hover:underline">How it works</Link></li>
        </ul>
      </div>
    </section>
  );
}
