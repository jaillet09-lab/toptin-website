import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { faqSchema, type Faq } from "@/lib/schema";

/** Accessible FAQ list on details/summary, with FAQPage structured data. */
export function FaqList({ faqs, schema = true, className = "" }: { faqs: Faq[]; schema?: boolean; className?: string }) {
  return (
    <div className={className}>
      {schema ? <JsonLd data={faqSchema(faqs)} /> : null}
      <div className="border-t border-line">
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b border-line" open={i === 0 ? true : undefined}>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-[18px] font-bold text-navy md:text-[20px] [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-full border border-line bg-white text-navy transition-colors group-open:border-tin group-open:bg-tin">
                <Icon name="plus" size={16} className="transition-transform duration-300 group-open:rotate-45" />
              </span>
            </summary>
            <p className="max-w-[68ch] pb-6 pr-6 text-[16px] leading-relaxed text-mute md:pr-14">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
