import Link from "next/link";

type Common = {
  children: React.ReactNode;
  className?: string;
  /** primary = Cacao fill; on-dark = Parchment fill for dusk sections */
  variant?: "primary" | "on-dark";
};

type AsLink = Common & { href: string; type?: never; onClick?: never };
type AsButton = Common & {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type KBButtonProps = AsLink | AsButton;

const BASE =
  "inline-flex items-center justify-center kb-label rounded-kb px-10 py-[14px] transition-colors duration-200";

const VARIANTS = {
  primary: "bg-kb-cacao text-kb-parchment hover:bg-kb-dusk",
  "on-dark": "bg-kb-parchment text-kb-cacao hover:bg-kb-kola",
} as const;

/** Primary K&B button. Renders an anchor when `href` is supplied. */
export function KBButton(props: KBButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { type, onClick, disabled } = props as AsButton;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
