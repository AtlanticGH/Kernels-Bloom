import type { Metadata } from "next";
import Link from "next/link";
import { GrainOverlay } from "@/components/grain-overlay";
import { CornerBrackets } from "@/components/corner-brackets";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Rooted in Ghanaian heritage, powered by science, built on community — the story behind Kernels & Bloom.",
  alternates: { canonical: "/story" },
};

const CHAPTERS = [
  { name: "Brand Story", href: "/story/brand", body: "A tribute to the beauty of Africa, told plainly." },
  { name: "The Facility", href: "/story/facility", body: "Where the botanicals become formulations." },
  { name: "Circular Process", href: "/story/circular-process", body: "Waste, transformed into luxury." },
  { name: "Community Partners", href: "/story/communities", body: "The twenty-plus communities we source with." },
  { name: "Founder", href: "/story/founder", body: "The vision, and the why." },
];

export default function StoryPage() {
  return (
    <div className="pt-[72px]">
      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <CornerBrackets arm={64} inset={32} color="var(--kb-chalk)" />
        <div className="relative mx-auto max-w-kb-max px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Our Story", href: "/story" },
            ]}
          />
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(40px,7vw,72px)] font-light italic leading-[1.05] text-kb-parchment">
            Rooted in heritage. Powered by science.
          </h1>
        </div>
      </section>

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <ul className="divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
            {CHAPTERS.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="group flex flex-col gap-1 py-8 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-[clamp(28px,4vw,40px)] font-light italic text-kb-cacao transition-colors group-hover:text-kb-terracotta">
                    {c.name}
                  </span>
                  <span className="max-w-sm font-body text-[15px] font-light text-kb-dusk/70">
                    {c.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
