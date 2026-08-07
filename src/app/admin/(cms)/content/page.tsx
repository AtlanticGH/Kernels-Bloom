import type { Metadata } from "next";
import { ContentEditor } from "@/components/admin/content-editor";

export const metadata: Metadata = {
  title: "CMS Content",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <div className="min-w-0">
      <div className="mb-8 border-b-[0.5px] border-kb-chalk pb-6">
        <h1 className="font-display text-[28px] text-kb-cacao">Content</h1>
        <p className="mt-2 max-w-2xl font-body text-[14px] font-light leading-relaxed text-kb-dusk/65">
          Browse by site area in the sidebar, edit a section, then save. Changes
          go live on the site immediately after saving.
        </p>
      </div>
      <ContentEditor />
    </div>
  );
}
