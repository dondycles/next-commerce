"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartTypes";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  unit_amount,
  image,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() =>
        cartStore.addProduct({ id, image, name, unit_amount, quantity })
      }
      className="bg-black p-4 text-white rounded-lg"
    >
      Add To Cart
    </button>
  );
}
