"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { PRIMARY_NAV, SITE, STORY_NAV } from "@/lib/site";

export function KBNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [headerH, setHeaderH] = useState(72);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const isStoryActive =
    pathname === "/story" || pathname.startsWith("/story/");

  useEffect(() => {
    const syncHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 72;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const h = headerRef.current?.offsetHeight ?? 72;
      setPastHero(y >= window.innerHeight - h);
    };

    const onResize = () => {
      syncHeaderHeight();
      onScroll();
    };

    syncHeaderHeight();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const atBottom = isHome && !pastHero && !open;

  const navLinkClass = (active: boolean) =>
    `kb-label text-[13px] transition-opacity duration-200 hover:opacity-60 ${
      atBottom ? "font-bold" : ""
    } ${active ? "text-kb-terracotta opacity-100" : "text-kb-dusk opacity-80"}`;

  return (
    <>
    <header
      ref={headerRef}
      className={`inset-x-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        atBottom ? "absolute" : "fixed top-0"
      }`}
      style={{
        top: atBottom ? `calc(100vh - ${headerH}px)` : undefined,
        backgroundColor: atBottom && !storyOpen ? "transparent" : "rgba(250, 246, 240, 0.95)",
        backdropFilter: atBottom && !storyOpen ? "none" : "blur(8px)",
        boxShadow: !atBottom && scrolled ? "0 1px 0 var(--kb-chalk)" : "none",
        borderTop: atBottom ? "0.5px solid rgba(107, 58, 42, 0.18)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-kb-max items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={`font-display text-[24px] text-kb-cacao ${
            atBottom ? "font-semibold" : "font-normal"
          }`}
          onClick={() => setOpen(false)}
        >
          Kernels &amp; Bloom
        </Link>

        {/* desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((link) =>
            link.label === "Our Story" ? (
              <StoryDropdown
                key={link.href}
                atBottom={atBottom}
                active={isStoryActive}
                linkClass={navLinkClass(isStoryActive)}
                onOpenChange={setStoryOpen}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={navLinkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            )
          )}
          <CurrencyToggle compact />
          <CartIcon />
        </nav>

        {/* mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <CurrencyToggle compact />
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
    </header>

    {/* Render outside header so backdrop-filter does not trap fixed positioning */}
    {open && (
      <div className="fixed inset-0 top-[var(--header-height)] z-40 overflow-y-auto bg-kb-parchment lg:hidden">
        <nav aria-label="Mobile" className="flex flex-col gap-2 px-6 py-10">
          <div className="mb-4 flex justify-end">
            <CurrencyToggle compact />
          </div>
          {PRIMARY_NAV.map((link) =>
            link.label === "Our Story" ? (
              <StoryMobileLinks
                key={link.href}
                active={isStoryActive}
                onNavigate={() => setOpen(false)}
              />
            ) : (
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
            )
          )}
          <p className="mt-8 kb-label text-[10px] text-kb-dusk/50">
            {SITE.origin} · Luxury circular beauty
          </p>
        </nav>
      </div>
    )}
    </>
  );
}

function StoryDropdown({
  atBottom,
  active,
  linkClass,
  onOpenChange,
}: {
  atBottom: boolean;
  active: boolean;
  linkClass: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuTop, setMenuTop] = useState(72);
  const [menuBottom, setMenuBottom] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateMenuPosition = () => {
    const button = buttonRef.current;
    const header = button?.closest("header");
    if (!button || !header) return;

    const buttonRect = button.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    setMenuLeft(buttonRect.left + buttonRect.width / 2);

    if (atBottom) {
      setMenuTop(0);
      setMenuBottom(window.innerHeight - headerRect.top);
    } else {
      setMenuTop(headerRect.bottom);
      setMenuBottom(null);
    }
  };

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    updateMenuPosition();
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    updateMenuPosition();
  }, [open, atBottom]);

  useEffect(() => {
    if (!open) return;
    updateMenuPosition();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const onLayout = () => updateMenuPosition();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("resize", onLayout);
    window.addEventListener("scroll", onLayout, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("scroll", onLayout);
    };
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      onOpenChange?.(false);
    },
    [onOpenChange]
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        className={`inline-flex items-center gap-1.5 ${linkClass}`}
      >
        Our Story
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="fixed z-[60] min-w-[220px] -translate-x-1/2"
          style={{
            top: menuBottom == null ? menuTop : undefined,
            bottom: menuBottom ?? undefined,
            left: menuLeft,
          }}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <ul
            role="menu"
            className={`kb-header-surface border-x-[0.5px] border-kb-chalk py-2 shadow-[0_1px_0_var(--kb-chalk)] ${
              menuBottom == null ? "border-b-[0.5px]" : "border-t-[0.5px]"
            }`}
          >
            {STORY_NAV.map((item) => {
              const itemActive = pathname === item.href;
              return (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={itemActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block px-5 py-2.5 font-body text-[13px] font-light transition-colors hover:bg-kb-linen/80 ${
                      itemActive ? "text-kb-terracotta" : "text-kb-dusk hover:text-kb-cacao"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

function StoryMobileLinks({
  active,
  onNavigate,
}: {
  active: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(active);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/story" || pathname.startsWith("/story/")) {
      setExpanded(true);
    }
  }, [pathname]);

  return (
    <div className="border-b-[0.5px] border-kb-chalk">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className={`flex w-full items-center justify-between py-4 font-display text-[28px] font-light italic transition-opacity hover:opacity-60 ${
          active ? "text-kb-terracotta" : "text-kb-cacao"
        }`}
      >
        Our Story
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {expanded && (
        <ul className="pb-4 pl-4">
          {STORY_NAV.map((item) => {
            const itemActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={itemActive ? "page" : undefined}
                  className={`block py-2.5 font-body text-[15px] font-light transition-opacity hover:opacity-60 ${
                    itemActive ? "text-kb-terracotta" : "text-kb-dusk/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
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
