"use client";

import { motion } from "framer-motion";
import { BotanicalIllustration } from "./botanical-illustration";
import { parseBotanicalName } from "@/lib/cms/botanical";
import type { CmsProcessStep } from "@/lib/cms/types";
import type { BotanicalName } from "@/lib/types";

const DEFAULT_STAGES: CmsProcessStep[] = [
  {
    name: "Botanical Sourcing",
    body: "Wild-gathered and cooperative-grown across Ghana and the continent, with the tree always left standing.",
    botanical: "Baobab",
  },
  {
    name: "Upcycle & Refine",
    body: "Seeds and by-products others discard — the Kalahari melon seed chief among them — are pressed and refined.",
    botanical: "Kalahari melon",
  },
  {
    name: "Formulation",
    body: "Botanical oils and extracts are formulated in Ghana, science-led and small-batch.",
    botanical: "Moringa",
  },
  {
    name: "Circular Return",
    body: "Glass and refills return through our programme, closing the loop on every product.",
    botanical: "Hibiscus",
  },
];

type CircularDiagramProps = {
  stages?: CmsProcessStep[];
};

export function CircularDiagram({ stages = DEFAULT_STAGES }: CircularDiagramProps) {
  return (
    <div className="grid grid-cols-1 gap-kb-8 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage, i) => {
        const botanical = parseBotanicalName(
          stage.botanical,
          (DEFAULT_STAGES[i]?.botanical as BotanicalName) ?? "Baobab"
        );

        return (
          <motion.div
            key={`${stage.name}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative text-center"
          >
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute right-[-20px] top-10 hidden h-px w-10 bg-kb-gold lg:block"
              />
            )}
            <div className="mx-auto grid h-20 w-20 place-items-center">
              <BotanicalIllustration name={botanical} size={72} opacity={0.6} />
            </div>
            <p className="mt-3 font-display text-[clamp(40px,5vw,64px)] font-light italic text-kb-gold">
              {i + 1}
            </p>
            <h3 className="mt-1 font-display text-[22px] font-semibold text-kb-cacao">
              {stage.name}
            </h3>
            <p className="mx-auto mt-3 max-w-xs font-body text-[14px] font-light leading-[1.8] text-kb-dusk/80">
              {stage.body}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
