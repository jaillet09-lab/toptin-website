import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui/Icon";
import { MailLink, TelLink } from "@/components/ui/TelLink";
import { services } from "@/data/services";
import { areas } from "@/data/areas";

const quickLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a free quote" },
];

/** Footer on every page, with the QBCC licence and ABN (required on all Queensland building advertising). */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-navy text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo variant="reversed" height={44} />
          <p className="mt-5 max-w-[34ch] text-[15px] text-white/70">{siteConfig.tagline}. {siteConfig.serviceArea.summary}.</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>
              <TelLink location="footer" className="inline-flex items-center gap-2.5 font-bold text-white hover:text-tin">
                <Icon name="phone" size={17} className="text-tin" />
                {siteConfig.phone}
              </TelLink>
            </li>
            <li>
              <MailLink location="footer" className="inline-flex items-center gap-2.5 text-white/85 hover:text-tin">
                <Icon name="mail" size={17} className="text-tin" />
                {siteConfig.email}
              </MailLink>
            </li>
            <li className="inline-flex items-center gap-2.5 text-white/85">
              <Icon name="clock" size={17} className="text-tin" />
              {siteConfig.hours.label}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-tin">Services</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-white/85 hover:text-white">{s.name}</Link></li>
            ))}
            <li><Link href="/services" className="text-white/85 hover:text-white">All services</Link></li>
          </ul>
          <h2 className="mt-8 text-[15px] font-bold uppercase tracking-[0.12em] text-tin">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {quickLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-white/85 hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-tin">Areas we cover</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[15px] sm:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}><Link href={`/areas/${a.slug}`} className="text-white/85 hover:text-white">{a.name}</Link></li>
            ))}
          </ul>
          <Link href="/areas" className="mt-5 inline-block text-[15px] font-semibold text-tin hover:underline">All areas</Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[13.5px] text-white/65 md:flex-row md:items-center md:justify-between">
          <p>
            <strong className="text-white">QBCC licence {siteConfig.qbcc}</strong>
            <span className="mx-2">·</span>
            <strong className="text-white">ABN {siteConfig.abn}</strong>
            <span className="mx-2">·</span>
            {siteConfig.base.city}, {siteConfig.base.state}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {year} {siteConfig.name}</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
