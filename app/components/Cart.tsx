"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { formatPrice } from "@/util/PriceFormat";
import { PiKeyReturnFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";
export default function () {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className=" fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 w-full sm:w-5/12 h-screen bg-base-100  p-4 rounded-l-lg flex flex-col gap-4"
      >
        <div className="flex flex-row gap-4 items-center">
          {cartStore.onCheckout !== "cart" && (
            <PiKeyReturnFill
              onClick={() => cartStore.setCheckout("cart")}
              className="text-3xl cursor-pointer text-primary"
            />
          )}
          {cartStore.onCheckout === "cart" && (
            <p className=" font-black text-primary">Your Cart list:</p>
          )}
          {cartStore.onCheckout === "checkout" && (
            <p className=" font-black text-primary">Checkout</p>
          )}
          <MdCancel
            onClick={() => cartStore.toggleCart()}
            className="text-3xl cursor-pointer ml-auto mr-0 text-primary"
          />
        </div>
        <div className=" overflow-y-scroll self-stretch scrollbar-thin scrollbar-thumb-base-content  -mr-4 pr-4">
          {cartStore.onCheckout === "cart" && (
            <>
              {cartStore.cart.map((item) => (
                <motion.div
                  layout={true}
                  key={item.id}
                  className="flex flex-row flex-wrap gap-4 bg-base-200 p-4 last:border-none mb-4 pr-4 rounded-md"
                >
                  <Image
                    className="aspect-square object-cover rounded-lg"
                    src={item.image as string}
                    alt={item.name}
                    quality={25}
                    width={300}
                    height={300}
                  ></Image>
                  <div className=" text-base-content">
                    <p className="font-black">{item.name}</p>
                    <div className="flex flex-row items-center text-2xl">
                      <p className=" text-base mr-2">Qty: {item.quantity}</p>
                      <button
                        className=" text-primary"
                        onClick={() =>
                          cartStore.addProduct({
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            unit_amount: item.unit_amount,
                            quantity: item.quantity,
                          })
                        }
                      >
                        <IoAddCircle />
                      </button>
                      <button
                        className=" text-primary"
                        onClick={() =>
                          cartStore.removeProduct({
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            unit_amount: item.unit_amount,
                            quantity: item.quantity,
                          })
                        }
                      >
                        <IoRemoveCircle />
                      </button>
                    </div>

                    <p className=" text-primary font-black">
                      Total Price:{" "}
                      {formatPrice(
                        (item.unit_amount as number) * (item.quantity as number)
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {cartStore.cart.length > 0 ? (
            <>
              {cartStore.onCheckout === "cart" && (
                <motion.button
                  layout
                  onClick={() => cartStore.setCheckout("checkout")}
                  className=" btn btn-primary"
                >
                  Check Out {formatPrice(totalPrice)}
                </motion.button>
              )}
            </>
          ) : (
            <>
              {cartStore.onCheckout === "cart" && (
                <motion.p
                  layout
                  animate={{ scale: 1 }}
                  initial={{ scale: 0.5 }}
                  transition={{ type: "spring", bounce: 0.25 }}
                >
                  Nothing is here because you can't afford...
                </motion.p>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
