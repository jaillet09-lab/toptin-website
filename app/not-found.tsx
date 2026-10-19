import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

export default function NotFound() {
  return (
    <section className="bg-page">
      <div className="wrap section max-w-[720px] text-center">
        <span className="eyebrow">Page not found</span>
        <h1 className="display-lg mt-4">That page is not here.</h1>
        <p className="lead mx-auto mt-5">It may have moved when we rebuilt the website. Try one of these, or give us a call.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-navy btn-lg">Home</Link>
          <Link href="/quote" className="btn btn-primary btn-lg">Get a free quote</Link>
          <TelLink location="404" className="btn btn-outline btn-lg"><Icon name="phone" size={18} />{siteConfig.phone}</TelLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-semibold text-navy">
          <li><Link href="/services" className="underline">Services</Link></li>
          <li><Link href="/projects" className="underline">Projects</Link></li>
          <li><Link href="/areas" className="underline">Areas</Link></li>
          <li><Link href="/blog" className="underline">Blog</Link></li>
          <li><Link href="/contact" className="underline">Contact</Link></li>
        </ul>
      </div>
    </section>
  );
}
