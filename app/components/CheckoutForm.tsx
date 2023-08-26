"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/util/PriceFormat";
import { useCartStore } from "@/store";
export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((res) => {
        if (!res.error) {
          cartStore.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      id="payment-form"
      className=" gap-4 flex flex-col"
    >
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <p className="font-black">Total Price: {formatPrice(totalPrice)}</p>
      <button
        id="submit"
        disabled={isLoading || !stripe || !elements}
        className="btn btn-primary"
      >
        <span id="button-text">
          {isLoading ? <span>Processing...</span> : <span>Pay Now</span>}
        </span>
      </button>
    </motion.form>
  );
}
