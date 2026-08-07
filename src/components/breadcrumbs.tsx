import Link from "next/link";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-2 kb-label text-[10px] ${
          isDark ? "text-kb-parchment/50" : "text-kb-dusk/50"
        }`}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span
                  aria-current="page"
                  className={isDark ? "text-kb-gold" : "text-kb-terracotta"}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={isDark ? "hover:text-kb-parchment" : "hover:text-kb-cacao"}
                >
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
