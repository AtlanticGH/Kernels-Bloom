"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Smaller inline preview — use in dense lists like product galleries. */
  compact?: boolean;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

export function ImageField({
  label,
  value,
  onChange,
  compact = false,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function onFileSelect(file: File | null) {
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        body,
      });

      const json = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Upload failed");
      }

      onChange(json.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const showPreview = value && isImagePath(value);

  const preview = showPreview ? (
    <div
      className={
        compact
          ? "relative aspect-square w-16 shrink-0 overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen"
          : "relative mt-2 aspect-[4/3] max-w-[180px] overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen"
      }
    >
      <Image
        src={value}
        alt=""
        fill
        className="object-cover"
        sizes={compact ? "64px" : "180px"}
        unoptimized={value.startsWith("http")}
      />
    </div>
  ) : null;

  const controls = (
    <div className="min-w-0 flex-1">
      <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-2"}`}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-1.5 font-body text-[12px] font-light text-kb-dusk transition-colors hover:border-kb-gold disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-kb px-3 py-1.5 font-body text-[12px] font-light text-kb-terracotta hover:text-kb-cacao"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="sr-only"
        onChange={(e) => void onFileSelect(e.target.files?.[0] ?? null)}
      />

      <label className="mt-2 block">
        <span className="font-body text-[11px] font-light text-kb-dusk/50">
          Or paste path / URL
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/photo.jpg"
          className="mt-1 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-1.5 font-body text-[13px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      </label>

      {uploadError && (
        <p className="mt-2 font-body text-[12px] font-light text-kb-terracotta">
          {uploadError}
        </p>
      )}
    </div>
  );

  return (
    <div className={`block min-w-0 ${compact ? "" : "sm:col-span-2"}`}>
      {label ? (
        <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>
      ) : null}

      {compact ? (
        <div className="mt-2 flex items-start gap-3">
          {preview}
          {controls}
        </div>
      ) : (
        <>
          {preview}
          {controls}
        </>
      )}
    </div>
  );
}
