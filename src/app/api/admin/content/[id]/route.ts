import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import {
  CMS_BLOCK_DEFAULTS,
  type CmsBlockId,
  type CmsBlockMap,
} from "@/lib/cms/blocks";
import { getCmsBlock, upsertCmsBlock } from "@/lib/cms/content";
import type { Product } from "@/lib/types";

function slimProductCatalogForSave(
  data: CmsBlockMap["catalog.products"]
): CmsBlockMap["catalog.products"] {
  return {
    items: data.items.map((product) => {
      const images = (
        product.images ?? (product.image ? [product.image] : [])
      ).filter(Boolean);
      return {
        slug: product.slug,
        image: images[0] ?? product.image,
        images,
      } as Product;
    }),
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
        ? slimProductCatalogForSave(body as CmsBlockMap["catalog.products"])
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
