import type { ReactNode } from "react";

type HeroHeadlineProps = {
  /** parchment on cacao heroes; cacao on light backgrounds */
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function HeroHeadline({
  tone = "dark",
  className = "",
  children,
}: HeroHeadlineProps) {
  const isDark = tone === "dark";

  return (
    <h1
      className={`font-display text-[clamp(40px,5vw,72px)] font-semibold not-italic leading-[1.1] tracking-tight ${
        isDark ? "kb-hero-headline-dark" : "text-kb-cacao"
      } ${className}`}
    >
      {children ?? (
        <>
          From the kernel,
          <br />
          To your bloom.
        </>
      )}
    </h1>
  );
}
