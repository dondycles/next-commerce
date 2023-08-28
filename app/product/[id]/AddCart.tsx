"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartTypes";
import { useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function AddCart() {
  const params = useSearchParams();
  const id = String(params?.get("id"));
  const name = String(params?.get("name"));
  const unit_amount = Number(params?.get("unit_amount"));
  const image = String(params?.get("image"));
  const quantity = Number(params?.get("quantity"));
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
      className="btn btn-primary w-full text-base-200 mb-0 mt-auto"
    >
      {!added ? "Add to card" : "Adding to cart..."}
    </button>
  );
}
