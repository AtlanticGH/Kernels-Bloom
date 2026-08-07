"use client";

import { useState } from "react";

type Item = { label: string; content: React.ReactNode };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.label}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="kb-label text-[11px] text-kb-cacao">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="text-kb-terracotta transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 font-body text-[15px] font-light leading-[1.85] text-kb-dusk/80">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
