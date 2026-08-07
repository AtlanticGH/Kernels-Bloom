import Link from "next/link";

type GoldCTAProps = {
  href: string;
  children: React.ReactNode;
  /** text colour token; defaults to cacao */
  tone?: "cacao" | "parchment" | "dusk";
  className?: string;
};

const TONE: Record<NonNullable<GoldCTAProps["tone"]>, string> = {
  cacao: "var(--kb-cacao)",
  parchment: "var(--kb-parchment)",
  dusk: "var(--kb-dusk)",
};

/** Text link with a gold 0.5px underline that extends to full width on hover. */
export function GoldCTA({
  href,
  children,
  tone = "cacao",
  className = "",
}: GoldCTAProps) {
  return (
    <Link
      href={href}
      className={`kb-gold-cta ${className}`}
      style={{ color: TONE[tone] }}
    >
      {children}
    </Link>
  );
}
