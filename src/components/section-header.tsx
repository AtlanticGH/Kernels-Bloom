import { HairlineRule } from "./hairline-rule";

type SectionHeaderProps = {
  label: string;
  headline: string;
  align?: "left" | "center";
  /** colour context — light (parchment/linen) or dark (dusk) backgrounds */
  tone?: "light" | "dark";
  labelColor?: "terracotta" | "cacao" | "gold";
  /** render the headline italic (Cormorant 300 italic) */
  italic?: boolean;
  className?: string;
};

/** Label + headline + gold hairline — the recurring section-intro pattern. */
export function SectionHeader({
  label,
  headline,
  align = "left",
  tone = "light",
  labelColor = "terracotta",
  italic = true,
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const labelCls =
    labelColor === "gold"
      ? "text-kb-gold"
      : labelColor === "terracotta"
        ? "text-kb-terracotta"
        : "text-kb-cacao";
  const headlineColor = tone === "dark" ? "text-kb-parchment" : "text-kb-cacao";

  return (
    <div
      className={`${isCenter ? "text-center" : ""} ${className}`}
    >
      <p className={`kb-label ${labelCls}`}>{label}</p>
      <h2
        className={`mt-3 font-display ${
          italic ? "italic font-light" : "font-normal"
        } text-[clamp(28px,4vw,44px)] leading-[1.12] ${headlineColor}`}
      >
        {headline}
      </h2>
      <HairlineRule
        width="120px"
        variant="gold"
        center={isCenter}
        className="mt-4"
      />
    </div>
  );
}
