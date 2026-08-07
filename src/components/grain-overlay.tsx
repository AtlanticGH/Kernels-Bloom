type GrainOverlayProps = {
  /** 0–1 opacity; brand range is 0.03–0.08 */
  opacity?: number;
  className?: string;
};

/** Subtle paper-grain texture layer. Decorative, absolutely positioned. */
export function GrainOverlay({ opacity = 0.06, className = "" }: GrainOverlayProps) {
  return (
    <span
      aria-hidden="true"
      className={`kb-grain pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity, mixBlendMode: "multiply" }}
    />
  );
}
