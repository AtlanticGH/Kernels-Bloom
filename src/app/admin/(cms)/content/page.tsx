import type { Metadata } from "next";
import { ContentEditor } from "@/components/admin/content-editor";

export const metadata: Metadata = {
  title: "CMS Content",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <div>
      <p className="kb-label text-[11px] text-kb-terracotta">Content</p>
      <h1 className="mt-2 font-display text-[36px] text-kb-cacao">
        Website content
      </h1>
      <p className="mt-3 max-w-xl font-body text-[15px] font-light leading-relaxed text-kb-dusk/70">
        Changes save to Supabase and appear on the live site when credentials are
        configured.
      </p>
      <div className="mt-10">
        <ContentEditor />
      </div>
    </div>
  );
}
