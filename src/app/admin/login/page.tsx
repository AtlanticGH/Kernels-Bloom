import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export const metadata: Metadata = {
  title: "CMS Sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const showInvalidError = searchParams?.error === "invalid";

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment p-8 shadow-sm">
        <p className="kb-label text-center text-[11px] text-kb-terracotta">
          Kernels &amp; Bloom CMS
        </p>
        <h1 className="mt-3 text-center font-display text-[32px] text-kb-cacao">
          Sign in
        </h1>
        <p className="mt-3 text-center font-body text-[14px] font-light text-kb-dusk/60">
          Edit every page, catalog, and form submissions.
        </p>

        {showInvalidError && (
          <p className="mt-6 rounded-kb border-[0.5px] border-kb-terracotta/40 bg-kb-linen/50 px-4 py-3 text-center font-body text-[13px] font-light leading-relaxed text-kb-terracotta">
            That password didn&apos;t match. Use the same value as{" "}
            <code className="text-kb-dusk/70">CMS_ADMIN_PASSWORD</code> in
            Vercel (or <code className="text-kb-dusk/70">.env.local</code>{" "}
            locally) — default is{" "}
            <code className="text-kb-dusk/70">password1234</code>.
          </p>
        )}

        <div className="mt-10">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
