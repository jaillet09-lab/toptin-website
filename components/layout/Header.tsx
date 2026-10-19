"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import { services } from "@/data/services";
import { navLinks } from "./nav";

/** Sticky white header: logo left, nav centre, phone and Get a free quote right. Hamburger below 1080px. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="flex min-h-11 shrink-0 items-center">
          <Logo height={38} priority />
        </Link>

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active(l.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors hover:text-navy ${active(l.href) ? "text-navy" : "text-mute"}`}
                >
                  <span className={active(l.href) ? "hl" : ""}>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 nav:flex">
          <TelLink location="header" className="flex items-center gap-2 text-[16px] font-bold text-navy hover:underline">
            <Icon name="phone" size={18} />
            {siteConfig.phone}
          </TelLink>
          <Link href="/quote" className="btn btn-primary btn-sm">Get a free quote</Link>
        </div>

        <div className="flex items-center gap-2 nav:hidden">
          <TelLink location="header-mobile" className="grid size-11 place-items-center rounded-full bg-navy text-white" aria-label={`Call ${siteConfig.phone}`}>
            <Icon name="phone" size={18} />
          </TelLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-line text-navy"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="nav:hidden fixed inset-x-0 bottom-0 top-[calc(var(--header-h)+env(safe-area-inset-top))] z-40 overflow-y-auto bg-white">
          <nav aria-label="Mobile" className="wrap py-6">
            <ul className="divide-y divide-line">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-14 items-center justify-between text-[19px] font-bold text-navy">
                    {l.label}
                    <Icon name="chevronRight" size={18} className="text-mute" />
                  </Link>
                </li>
              ))}
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="flex min-h-12 items-center pl-4 text-[16px] font-semibold text-mute">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <Link href="/quote" className="btn btn-primary btn-lg">Get a free quote</Link>
              <TelLink location="mobile-menu" className="btn btn-outline btn-lg">
                <Icon name="phone" size={18} />
                Call {siteConfig.phone}
              </TelLink>
              <p className="mt-2 text-center text-[13px] text-mute">{siteConfig.hours.label}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
