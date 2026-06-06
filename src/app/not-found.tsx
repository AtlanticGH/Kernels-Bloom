import { KBButton } from "@/components/kb-button";
import { GoldCTA } from "@/components/gold-cta";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 pt-[88px] text-center">
      <div>
        <p className="kb-label text-kb-terracotta">404</p>
        <h1 className="mt-3 font-display text-[clamp(36px,6vw,64px)] font-light italic text-kb-cacao">
          This path hasn&apos;t bloomed.
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-[15px] font-light text-kb-dusk/70">
          The page you&apos;re after isn&apos;t here. Let&apos;s find your way
          back to the botanicals.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <KBButton href="/">Return home</KBButton>
          <GoldCTA href="/shop/all">Browse the collection →</GoldCTA>
        </div>
      </div>
    </div>
  );
}
