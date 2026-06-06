type HairlineRuleProps = {
  /** width as a CSS value, e.g. "120px" or "40%" */
  width?: string;
  variant?: "gold" | "chalk" | "terracotta";
  className?: string;
  /** centre the rule within its container */
  center?: boolean;
};

const COLORS: Record<NonNullable<HairlineRuleProps["variant"]>, string> = {
  gold: "var(--kb-gold)",
  chalk: "var(--kb-chalk)",
  terracotta: "var(--kb-terracotta)",
};

/** 0.5px hairline rule. Gold for hero, Chalk for body, Terracotta for accent. */
export function HairlineRule({
  width = "120px",
  variant = "gold",
  className = "",
  center = false,
}: HairlineRuleProps) {
  return (
    <span
      aria-hidden="true"
      className={`block ${center ? "mx-auto" : ""} ${className}`}
      style={{ width, height: "0.5px", backgroundColor: COLORS[variant] }}
    />
  );
}
