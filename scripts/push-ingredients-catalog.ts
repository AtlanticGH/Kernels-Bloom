import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ingredients as localIngredients } from "../src/lib/data/ingredients";
import type { Ingredient } from "../src/lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env.local");
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

function mergeForPush(base: Ingredient, cms?: Ingredient): Ingredient {
  if (!cms) return base;
  const tileImage = cms.tileImage?.trim();
  return {
    ...base,
    ...(tileImage ? { tileImage } : {}),
  };
}

async function fetchCmsIngredients(
  url: string,
  key: string
): Promise<Ingredient[]> {
  const res = await fetch(
    `${url}/rest/v1/site_content?id=eq.catalog.ingredients&select=data`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch catalog.ingredients: ${await res.text()}`);
  }

  const rows = (await res.json()) as { data?: { items?: Ingredient[] } }[];
  return rows[0]?.data?.items ?? [];
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const cmsItems = await fetchCmsIngredients(url, key);
  const cmsBySlug = new Map(cmsItems.map((item) => [item.slug, item]));

  const items = localIngredients.map((base) =>
    mergeForPush(base, cmsBySlug.get(base.slug))
  );

  const preserved = items.filter((item) => {
    const cms = cmsBySlug.get(item.slug);
    return Boolean(cms?.tileImage?.trim());
  }).length;

  const res = await fetch(`${url}/rest/v1/site_content`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: "catalog.ingredients",
      data: { items },
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error(
      "Failed to upsert catalog.ingredients:",
      res.status,
      await res.text()
    );
    process.exit(1);
  }

  console.log(
    `Pushed ${items.length} ingredients to Supabase (preserved ${preserved} CMS tile images)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
