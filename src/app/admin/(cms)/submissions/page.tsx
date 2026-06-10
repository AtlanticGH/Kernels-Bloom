import type { Metadata } from "next";
import { SubmissionsTable } from "@/components/admin/submissions-table";

export const metadata: Metadata = {
  title: "CMS Submissions",
  robots: { index: false, follow: false },
};

export default function AdminSubmissionsPage() {
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
      <div className="mt-10">
        <SubmissionsTable />
      </div>
    </div>
  );
}
