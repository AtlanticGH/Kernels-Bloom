"use client";

import { CurrencyToggle } from "@/components/currency-toggle";
import { ProductPrice } from "@/components/product-price";

export function ProductPriceSection({
  price,
  volume,
}: {
  price: number;
  volume: string;
}) {
  return (
    <div>
      <p className="mt-5 font-body text-[18px] font-light text-kb-dusk">
        <ProductPrice amount={price} />
      </p>
      <p className="font-body text-[13px] font-light text-kb-dusk/60">{volume}</p>
      <CurrencyToggle className="mt-3" />
    </div>
  );
}
