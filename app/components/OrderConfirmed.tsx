"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  return (
    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
      <div className=" flex gap-4 flex-col items-center justify-center">
        <p className=" font-black text-lg">Your order has been placed!</p>
        <p className=" text-sm">Check your email for the receipt.</p>
      </div>
      <button
        onClick={() => {
          cartStore.toggleCart();
          setTimeout(() => {
            cartStore.setCheckout("cart");
          }, 1000);
          parent.open("/dashboard");
        }}
        className="btn btn-primary w-full mt-4"
      >
        Check Order
      </button>
    </motion.div>
  );
}
