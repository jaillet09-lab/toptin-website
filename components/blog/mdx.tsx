import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { siteConfig } from "@/site.config";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...rest}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-[14px] border border-line">
      <table {...props} />
    </div>
  );
}

/** Call to action used in the middle and at the end of every post. */
export function PostCta({ service }: { service?: string }) {
  const href = service ? `/quote?service=${service}` : "/quote";
  return (
    <aside className="not-prose my-10 rounded-[14px] bg-navy p-6 text-white md:p-8">
      <p className="font-display text-[22px] font-extrabold leading-tight">Want a straight answer about your roof?</p>
      <p className="mt-2 text-[15.5px] text-white/75">We inspect it for free and send you a written quote. {siteConfig.hours.label}.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={href} className="btn btn-primary">Get a free quote <Icon name="arrow" size={17} /></Link>
        <TelLink location="post-cta" className="btn btn-ghost"><Icon name="phone" size={17} />{siteConfig.phone}</TelLink>
      </div>
    </aside>
  );
}

export const mdxComponents = { a: Anchor, table: Table, PostCta };
