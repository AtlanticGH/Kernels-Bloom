import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { createServiceClient } from "@/lib/integrations/supabase-server";

const BUCKET = "cms";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = createServiceClient();
  if (!client) {
    return NextResponse.json(
      { error: "Supabase is not configured for uploads." },
      { status: 502 }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isImage = IMAGE_TYPES.has(file.type);
    const isVideo = VIDEO_TYPES.has(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Use JPEG, PNG, WebP, GIF, AVIF, MP4, or WebM." },
        { status: 400 }
      );
    }

    const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: isVideo
            ? "Video must be 50 MB or smaller."
            : "Image must be 8 MB or smaller.",
        },
        { status: 400 }
      );
    }

    const ext = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf("."))
      : isVideo
        ? ".mp4"
        : ".jpg";
    const path = `${Date.now()}-${safeName(file.name.replace(ext, ""))}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await client.storage.from(BUCKET).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    const { data } = client.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 400 });
  }
}
