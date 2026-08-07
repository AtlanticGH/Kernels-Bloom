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
 * Corner angle-markings — intentionally disabled across the site.
 * Kept as a no-op so existing call sites continue to type-check without edits.
 */
export function CornerBrackets(_props: CornerBracketsProps) {
  return null;
}
