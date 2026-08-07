import type { BotanicalName } from "@/lib/types";

type BotanicalIllustrationProps = {
  name: BotanicalName | null;
  size?: number | string;
  /** 0–1; brand range 0.4–0.6 */
  opacity?: number;
  color?: string;
  className?: string;
};

/**
 * Outline-only botanical line illustrations (no fills) per the K&B vocabulary.
 * Decorative by default. Kola Sand stroke, ~1px, low opacity.
 */
export function BotanicalIllustration({
  name,
  size = 120,
  opacity = 0.5,
  color = "var(--kb-kola)",
  className = "",
}: BotanicalIllustrationProps) {
  if (!name) return null;
  const path = PATHS[name];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity }}
      className={className}
    >
      {path}
    </svg>
  );
}

const PATHS: Record<BotanicalName, React.ReactNode> = {
  // Shea — branch with paired leaves and a nut
  Shea: (
    <>
      <path d="M50 92 C50 70 50 40 50 16" />
      <path d="M50 60 C38 56 30 46 30 34 C42 36 50 46 50 58" />
      <path d="M50 60 C62 56 70 46 70 34 C58 36 50 46 50 58" />
      <path d="M50 40 C40 36 34 28 34 18 C44 20 50 28 50 38" />
      <path d="M50 40 C60 36 66 28 66 18 C56 20 50 28 50 38" />
      <ellipse cx="50" cy="80" rx="9" ry="11" />
    </>
  ),
  // Baobab — swollen trunk, bare root-like branches
  Baobab: (
    <>
      <path d="M38 92 C40 70 42 56 44 48 M62 92 C60 70 58 56 56 48" />
      <path d="M44 48 C40 44 50 42 50 42 C50 42 60 44 56 48" />
      <path d="M50 42 C50 34 46 24 38 18 M50 42 C50 32 54 22 64 16 M50 42 C48 30 40 22 30 22 M50 42 C52 30 62 26 72 28" />
      <path d="M38 18 C34 16 32 12 33 10 M64 16 C68 14 70 12 70 11 M30 22 C26 22 23 20 22 18 M72 28 C76 28 79 27 80 25" />
    </>
  ),
  // Moringa — pinnate compound leaf with small round leaflets
  Moringa: (
    <>
      <path d="M50 94 C50 70 50 40 52 14" />
      {[28, 40, 52, 64, 76].map((y, i) => (
        <g key={y}>
          <path d={`M${50 + (i % 2 === 0 ? 0 : 1)} ${y} C40 ${y - 4} 32 ${y - 6} 26 ${y - 4}`} />
          <path d={`M${50 + (i % 2 === 0 ? 0 : 1)} ${y} C60 ${y - 4} 68 ${y - 6} 74 ${y - 4}`} />
          <circle cx="24" cy={y - 4} r="3" />
          <circle cx="76" cy={y - 4} r="3" />
        </g>
      ))}
    </>
  ),
  // Hibiscus — five-petal flower with protruding stamen
  Hibiscus: (
    <>
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M50 50 C40 30 60 30 50 50"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <path d="M50 50 C56 60 56 74 54 84" />
      <circle cx="54" cy="86" r="2.5" />
      <path d="M50 50 L50 50" />
    </>
  ),
  // Marula — branch with oval fruit clusters
  Marula: (
    <>
      <path d="M50 92 C50 66 50 38 50 16" />
      <path d="M50 48 C40 44 34 36 34 26 M50 48 C60 44 66 36 66 26" />
      <path d="M50 30 C44 28 40 22 40 16 M50 30 C56 28 60 22 60 16" />
      <ellipse cx="40" cy="70" rx="6" ry="8" />
      <ellipse cx="58" cy="76" rx="6" ry="8" />
      <ellipse cx="50" cy="82" rx="6" ry="8" />
    </>
  ),
  // Palm — slender trunk with arching fronds
  Palm: (
    <>
      <path d="M50 92 C49 72 48 52 50 34 C51 22 50 14 50 12" />
      <path d="M50 14 C50 4 28 2 14 10" />
      <path d="M50 14 C50 4 72 2 86 10" />
      <path d="M50 13 C38 4 24 6 16 14" />
      <path d="M50 13 C62 4 76 6 84 14" />
      <path d="M50 12 C50 2 50 0 50 0" />
      <path d="M50 14 C42 6 32 8 24 16" />
      <path d="M50 14 C58 6 68 8 76 16" />
      <path d="M14 10 C10 16 8 22 8 28" />
      <path d="M86 10 C90 16 92 22 92 28" />
    </>
  ),
  // Kalahari melon — round melon on a trailing vine with a leaf
  "Kalahari melon": (
    <>
      <circle cx="52" cy="62" r="22" />
      <path d="M40 46 C44 56 44 68 40 78 M52 40 C52 52 52 72 52 84 M64 46 C60 56 60 68 64 78" />
      <path d="M40 44 C34 34 26 30 18 32 C22 24 32 22 40 28" />
      <path d="M30 40 C26 36 22 36 20 38" />
    </>
  ),
};
