type HeroHeadlineProps = {
  /** parchment on cacao heroes; cacao on light backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

export function HeroHeadline({
  tone = "dark",
  className = "",
}: HeroHeadlineProps) {
  const color = tone === "dark" ? "text-kb-parchment" : "text-kb-cacao";

  return (
    <h1
      className={`font-display text-[clamp(40px,5vw,72px)] font-semibold not-italic leading-[1.1] tracking-tight ${color} ${className}`}
    >
      From the kernel,
      <br />
      To your bloom.
    </h1>
  );
}
