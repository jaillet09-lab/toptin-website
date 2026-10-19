import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

/** Sticky bottom bar on phones and tablets: Call and Free quote. */
export function MobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 backdrop-blur-md nav:hidden print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex gap-2.5 px-3 py-2.5">
        <TelLink location="mobile-bar" className="btn btn-ghost min-h-[50px] flex-1 px-2 text-[15px]">
          <Icon name="phone" size={17} />
          Call
        </TelLink>
        <Link href="/quote" className="btn btn-primary min-h-[50px] flex-[1.4] px-2 text-[15px]">
          Free quote
        </Link>
      </div>
    </div>
  );
}
