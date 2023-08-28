"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartTypes";
import { useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function PageAddCart({
  id,
  image,
  name,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);
  const handleAddToCard = () => {
    cartStore.addProduct({ id, image, name, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };
  return (
    <button
      onClick={handleAddToCard}
      disabled={added}
      className="btn btn-primary md:max-w-[300px] w-full"
    >
      {!added ? "Add to card" : "Adding to cart..."}
    </button>
  );
}
