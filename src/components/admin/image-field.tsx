"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
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

  return (
    <div className="block min-w-0 sm:col-span-2">
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>

      {showPreview && (
        <div className="relative mt-3 aspect-[16/10] max-w-md overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
          <Image
            src={value}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={value.startsWith("http")}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-4 py-2 font-body text-[13px] font-light text-kb-dusk transition-colors hover:border-kb-gold disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-kb px-4 py-2 font-body text-[13px] font-light text-kb-terracotta hover:text-kb-cacao"
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

      <label className="mt-3 block">
        <span className="font-body text-[11px] font-light text-kb-dusk/50">
          Or paste an image path / URL
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/photo.jpg"
          className="mt-1 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      </label>

      {uploadError && (
        <p className="mt-2 font-body text-[12px] font-light text-kb-terracotta">
          {uploadError}
        </p>
      )}
    </div>
  );
}
