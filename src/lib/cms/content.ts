import {
  CMS_BLOCK_DEFAULTS,
  type CmsBlockId,
  type CmsBlockMap,
} from "./blocks";
import { createServiceClient } from "@/lib/integrations/supabase-server";

export async function getCmsBlock<K extends CmsBlockId>(
  id: K
): Promise<CmsBlockMap[K]> {
  const defaults = CMS_BLOCK_DEFAULTS[id];
  const client = createServiceClient();
  if (!client) return defaults;

  const { data, error } = await client
    .from("site_content")
    .select("data")
    .eq("id", id)
    .maybeSingle();

  if (error || !data?.data || typeof data.data !== "object") {
    return defaults;
  }

  return { ...defaults, ...(data.data as Partial<CmsBlockMap[K]>) };
}

export async function listCmsBlocks(): Promise<
  { id: CmsBlockId; data: CmsBlockMap[CmsBlockId]; updated_at: string | null }[]
> {
  const client = createServiceClient();
  const ids = Object.keys(CMS_BLOCK_DEFAULTS) as CmsBlockId[];

  if (!client) {
    return ids.map((id) => ({
      id,
      data: CMS_BLOCK_DEFAULTS[id],
      updated_at: null,
    }));
  }

  const { data } = await client
    .from("site_content")
    .select("id, data, updated_at")
    .in("id", ids);

  const byId = new Map(
    (data ?? []).map((row) => [row.id as CmsBlockId, row])
  );

  return ids.map((id) => {
    const row = byId.get(id);
    return {
      id,
      data: row?.data
        ? { ...CMS_BLOCK_DEFAULTS[id], ...(row.data as object) }
        : CMS_BLOCK_DEFAULTS[id],
      updated_at: row?.updated_at ?? null,
    };
  });
}

export async function upsertCmsBlock<K extends CmsBlockId>(
  id: K,
  data: CmsBlockMap[K]
): Promise<{ ok: boolean; error?: string }> {
  const client = createServiceClient();
  if (!client) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const { error } = await client.from("site_content").upsert({
    id,
    data,
    updated_at: new Date().toISOString(),
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
