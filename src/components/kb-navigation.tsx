"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV, SITE } from "@/lib/site";

export function KBNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [headerH, setHeaderH] = useState(72);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // The bar starts at the base of the full-screen hero and scrolls up with it.
      // Pin it to the top exactly when its top edge reaches the viewport top.
      const h = headerRef.current?.offsetHeight ?? 72;
      setHeaderH(h);
      setPastHero(y >= window.innerHeight - h);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // lock body scroll when the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // On the homepage, anchor to the base of the hero and scroll up with it until
  // it reaches the top, then pin. (When the mobile menu is open, snap to top.)
  const atBottom = isHome && !pastHero && !open;

  return (
    <header
      ref={headerRef}
      className={`inset-x-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        atBottom ? "absolute" : "fixed top-0"
      }`}
      style={{
        top: atBottom ? `calc(100vh - ${headerH}px)` : undefined,
        backgroundColor: atBottom ? "transparent" : "rgba(250, 246, 240, 0.95)",
        backdropFilter: atBottom ? "none" : "blur(8px)",
        boxShadow: !atBottom && scrolled ? "0 1px 0 var(--kb-chalk)" : "none",
        borderTop: atBottom ? "0.5px solid rgba(107, 58, 42, 0.18)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-kb-max items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={`font-display text-[18px] text-kb-cacao ${
            atBottom ? "font-semibold" : "font-normal"
          }`}
          onClick={() => setOpen(false)}
        >
          Kernels &amp; Bloom
        </Link>

        {/* desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`kb-label text-[11px] transition-opacity duration-200 hover:opacity-60 ${
                atBottom ? "font-bold" : ""
              } ${
                isActive(link.href) ? "text-kb-terracotta opacity-100" : "text-kb-dusk opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <CartIcon />
        </nav>

        {/* mobile controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <CartIcon />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center text-kb-cacao"
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-[72px] z-40 bg-kb-parchment lg:hidden">
          <nav
            aria-label="Mobile"
            className="flex flex-col gap-2 px-6 py-10"
          >
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`border-b-[0.5px] border-kb-chalk py-4 font-display text-[28px] font-light italic transition-opacity hover:opacity-60 ${
                  isActive(link.href) ? "text-kb-terracotta" : "text-kb-cacao"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-8 kb-label text-[10px] text-kb-dusk/50">
              {SITE.origin} · Luxury circular beauty
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="grid h-8 w-8 place-items-center text-kb-cacao transition-colors hover:text-kb-terracotta"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.5 9h11l-1 8a1.5 1.5 0 0 1-1.5 1.3H9a1.5 1.5 0 0 1-1.5-1.3l-1-8Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M9 9a3 3 0 0 1 6 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
