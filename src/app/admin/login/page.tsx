import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export const metadata: Metadata = {
  title: "CMS Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-kb-linen px-6 py-16">
      <div className="w-full max-w-md">
        <p className="kb-label text-center text-[11px] text-kb-terracotta">
          Kernels &amp; Bloom CMS
        </p>
        <h1 className="mt-3 text-center font-display text-[32px] text-kb-cacao">
          Sign in
        </h1>
        <p className="mt-3 text-center font-body text-[14px] font-light text-kb-dusk/60">
          Manage homepage content and review form submissions.
        </p>
        <div className="mt-10">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
