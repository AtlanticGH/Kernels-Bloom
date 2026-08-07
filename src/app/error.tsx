"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center bg-kb-parchment px-6 py-kb-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="kb-label text-kb-terracotta">Something went wrong</p>
        <h1 className="mt-4 font-display text-[clamp(32px,5vw,48px)] text-kb-cacao">
          This page stumbled.
        </h1>
        <p className="mt-4 font-body text-[15px] font-light leading-relaxed text-kb-dusk/70">
          A temporary error occurred. Try again, or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-kb bg-kb-cacao px-8 py-3 font-body text-[13px] font-light text-kb-parchment transition-colors hover:bg-kb-terracotta"
          >
            Try again
          </button>
          <a
            href="/"
            className="font-body text-[13px] font-light text-kb-terracotta transition-colors hover:text-kb-cacao"
          >
            Return home →
          </a>
        </div>
      </div>
    </section>
  );
}
