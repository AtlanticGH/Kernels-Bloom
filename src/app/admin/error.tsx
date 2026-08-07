"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-kb border-[0.5px] border-kb-terracotta/30 bg-kb-parchment p-8">
      <p className="kb-label text-[10px] text-kb-terracotta">CMS error</p>
      <h1 className="mt-2 font-display text-[28px] text-kb-cacao">
        Could not load this page
      </h1>
      <p className="mt-3 font-body text-[14px] font-light text-kb-dusk/70">
        {error.message || "An unexpected error occurred in the admin."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-kb bg-kb-cacao px-5 py-2.5 font-body text-[13px] font-light text-kb-parchment hover:bg-kb-terracotta"
        >
          Try again
        </button>
        <a
          href="/admin/login"
          className="inline-flex items-center px-2 font-body text-[13px] font-light text-kb-terracotta hover:text-kb-cacao"
        >
          Back to sign in →
        </a>
      </div>
    </div>
  );
}
