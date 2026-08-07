"use client";

import { useRef, useState } from "react";

type VideoFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  poster?: string;
};

function isVideoPath(path: string): boolean {
  return /\.(mp4|webm)(\?.*)?$/i.test(path);
}

export function VideoField({
  label,
  value,
  onChange,
  poster,
}: VideoFieldProps) {
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

  const showPreview = value && isVideoPath(value);

  return (
    <div className="block min-w-0 sm:col-span-2">
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>

      {showPreview && (
        <div className="relative mt-2 aspect-video max-w-[280px] overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
          <video
            src={value}
            controls
            playsInline
            preload="metadata"
            poster={poster || undefined}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-1.5 font-body text-[12px] font-light text-kb-dusk transition-colors hover:border-kb-gold disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload video"}
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
        accept="video/mp4,video/webm"
        className="sr-only"
        onChange={(e) => void onFileSelect(e.target.files?.[0] ?? null)}
      />

      <label className="mt-2 block">
        <span className="font-body text-[11px] font-light text-kb-dusk/50">
          Or paste a video path / URL (MP4 or WebM)
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/videos/hero.mp4"
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
}
