"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/submissions", label: "Submissions" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const wideLayout = pathname.startsWith("/admin/content");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-kb-linen">
      <header className="border-b-[0.5px] border-kb-chalk bg-kb-parchment">
        <div
          className={`mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 ${
            wideLayout ? "max-w-[1600px]" : "max-w-7xl"
          }`}
        >
          <div>
            <p className="kb-label text-[10px] text-kb-terracotta">CMS</p>
            <p className="font-display text-[20px] text-kb-cacao">
              Kernels &amp; Bloom
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="font-body text-[13px] font-light text-kb-dusk/70 transition-colors hover:text-kb-cacao"
            >
              View site →
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="kb-label text-[11px] text-kb-terracotta transition-colors hover:text-kb-cacao"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav
          className={`mx-auto flex gap-1 overflow-x-auto px-6 ${
            wideLayout ? "max-w-[1600px]" : "max-w-7xl"
          }`}
          aria-label="CMS sections"
        >
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 border-b-2 px-4 py-3 font-body text-[13px] font-light transition-colors ${
                  active
                    ? "border-kb-cacao text-kb-cacao"
                    : "border-transparent text-kb-dusk/60 hover:border-kb-chalk hover:text-kb-cacao"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main
        className={`mx-auto px-6 py-8 ${
          wideLayout ? "max-w-[1600px]" : "max-w-7xl"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
