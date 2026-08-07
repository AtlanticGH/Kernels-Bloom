import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import {
  CMS_BLOCK_DEFAULTS,
  type CmsBlockId,
  type CmsBlockMap,
} from "@/lib/cms/blocks";
import { getCmsBlock, upsertCmsBlock } from "@/lib/cms/content";
import type { Product } from "@/lib/types";

function normalizeProductForSave(product: Product): Product {
  const images = (
    product.images ?? (product.image ? [product.image] : [])
  ).filter(Boolean);

  return {
    ...product,
    slug: product.slug.trim(),
    name: product.name.trim(),
    image: images[0] ?? product.image,
    images,
    price: Math.max(0, Number(product.price) || 0),
    description: product.description.map((p) => p.trim()).filter(Boolean),
    ingredients: product.ingredients.map((s) => s.trim()).filter(Boolean),
    skinTypes: product.skinTypes.map((s) => s.trim()).filter(Boolean),
    related: product.related.map((s) => s.trim()).filter(Boolean),
  };
}

function productCatalogForSave(
  data: CmsBlockMap["catalog.products"]
): CmsBlockMap["catalog.products"] {
  return {
    items: data.items.map(normalizeProductForSave),
  };
}

type RouteContext = { params: { id: string } };

function isBlockId(id: string): id is CmsBlockId {
  return id in CMS_BLOCK_DEFAULTS;
}

export async function GET(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlockId(params.id)) {
    return NextResponse.json({ error: "Unknown block" }, { status: 404 });
  }

  const data = await getCmsBlock(params.id);
  return NextResponse.json({ id: params.id, data });
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlockId(params.id)) {
    return NextResponse.json({ error: "Unknown block" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const payload =
      params.id === "catalog.products"
        ? productCatalogForSave(body as CmsBlockMap["catalog.products"])
        : { ...CMS_BLOCK_DEFAULTS[params.id], ...body };

    const result = await upsertCmsBlock(params.id, payload);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
