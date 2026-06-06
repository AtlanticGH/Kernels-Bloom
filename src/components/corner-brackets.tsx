type CornerBracketsProps = {
  /** arm length in px */
  arm?: number;
  /** stroke colour — defaults to gold */
  color?: string;
  /** distance the brackets sit inside the framed element */
  inset?: number;
  /** show only top-left + bottom-right (the K&B default) or all four */
  all?: boolean;
  className?: string;
};

/**
 * Two open L-shapes framing an element. 1px gold lines per the brand guide.
 * Decorative — hidden from assistive tech.
 */
export function CornerBrackets({
  arm = 80,
  color = "var(--kb-gold)",
  inset = 24,
  all = false,
  className = "",
}: CornerBracketsProps) {
  const line: React.CSSProperties = {
    position: "absolute",
    borderColor: color,
  };
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {/* top-left */}
      <span
        style={{
          ...line,
          top: inset,
          left: inset,
          width: arm,
          height: arm,
          borderTop: "1px solid",
          borderLeft: "1px solid",
        }}
      />
      {/* bottom-right */}
      <span
        style={{
          ...line,
          bottom: inset,
          right: inset,
          width: arm,
          height: arm,
          borderBottom: "1px solid",
          borderRight: "1px solid",
        }}
      />
      {all && (
        <>
          <span
            style={{
              ...line,
              top: inset,
              right: inset,
              width: arm,
              height: arm,
              borderTop: "1px solid",
              borderRight: "1px solid",
            }}
          />
          <span
            style={{
              ...line,
              bottom: inset,
              left: inset,
              width: arm,
              height: arm,
              borderBottom: "1px solid",
              borderLeft: "1px solid",
            }}
          />
        </>
      )}
    </div>
  );
}
