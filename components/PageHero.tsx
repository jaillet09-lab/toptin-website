import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/site.config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import type { Crumb } from "@/lib/schema";

/** Dark hero for inner pages: breadcrumbs, H1, intro, quote and call buttons, optional real photo. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  photo,
  quoteHref = "/quote",
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  photo?: { src: string; alt: string };
  quoteHref?: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      {photo ? (
        <>
          <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" aria-hidden="true" />
        </>
      ) : null}
      <div className="wrap relative py-12 md:py-20">
        <Breadcrumbs items={crumbs} dark />
        <div className="mt-6 max-w-[760px]">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="display-xl mt-3">{title}</h1>
          {intro ? <div className="lead mt-5">{intro}</div> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={quoteHref} className="btn btn-primary btn-lg">Get a free quote <Icon name="arrow" size={18} /></Link>
            <TelLink location="page-hero" className="btn btn-ghost btn-lg"><Icon name="phone" size={18} />Call {siteConfig.phone}</TelLink>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
