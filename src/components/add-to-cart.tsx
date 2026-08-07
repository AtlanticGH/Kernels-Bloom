"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { KBButton } from "./kb-button";

export function AddToCart({ slug, inStock }: { slug: string; inStock: boolean }) {
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <KBButton type="button" disabled className="w-full">
        Join the waitlist
      </KBButton>
    );
  }

  return (
    <KBButton
      type="button"
      className="w-full"
      onClick={() => {
        addToCart(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }}
    >
      {added ? "Added to your ritual ✓" : "Add to cart"}
    </KBButton>
  );
}
