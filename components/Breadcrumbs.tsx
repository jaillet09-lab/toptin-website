import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/** Visible breadcrumb trail plus BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb" className={`text-[13.5px] ${dark ? "text-white/65" : "text-mute"}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className={dark ? "text-white" : "text-navy"}>{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:underline">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
