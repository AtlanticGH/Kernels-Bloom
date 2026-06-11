import type { Metadata } from "next";
import { SubmissionsTable } from "@/components/admin/submissions-table";
import { listSubmissions } from "@/lib/cms/submissions";
import { isSupabaseConfigured } from "@/lib/integrations/supabase-server";

export const metadata: Metadata = {
  title: "CMS Submissions",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const submissions = await listSubmissions();

  return (
    <div>
      <p className="kb-label text-[11px] text-kb-terracotta">Submissions</p>
      <h1 className="mt-2 font-display text-[36px] text-kb-cacao">
        Form submissions
      </h1>
      <p className="mt-3 max-w-xl font-body text-[15px] font-light leading-relaxed text-kb-dusk/70">
        Trade applications, skin ritual consultations, and quiz results from the
        site forms.
      </p>
      {!isSupabaseConfigured() && (
        <p className="mt-4 rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/60 px-4 py-3 font-body text-[13px] font-light text-kb-dusk/60">
          Supabase is not configured — submissions will appear here once{" "}
          <code className="text-kb-cacao">SUPABASE_SERVICE_ROLE_KEY</code> is set.
        </p>
      )}
      <div className="mt-10">
        <SubmissionsTable initialSubmissions={submissions} />
      </div>
    </div>
  );
}
