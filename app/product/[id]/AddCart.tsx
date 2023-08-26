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
      className="btn btn-primary max-w-[300px] w-screen"
    >
      {!added ? "Add to card" : "Adding to cart..."}
      id: {id}
    </button>
  );
}
