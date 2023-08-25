"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { formatPrice } from "@/util/PriceFormat";
import { PiKeyReturnFill } from "react-icons/pi";

export default function () {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className=" fixed w-full h-screen left-0 top-0 backdrop-blur-[2px] backdrop-brightness-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 w-full sm:w-5/12 h-screen bg-white sm:bg-white text-black p-4 rounded-l-lg flex flex-col gap-4"
      >
        <div className="flex flex-row gap-4 items-center">
          <PiKeyReturnFill
            onClick={() => cartStore.toggleCart()}
            className="text-3xl cursor-pointer"
          />
          <p className=" font-black">Your Cart list:</p>
        </div>
        <div className=" overflow-y-scroll self-stretch -mr-4">
          {cartStore.cart.map((item) => (
            <div className="flex flex-row flex-wrap gap-4 border-b-black/25 border-b-[1px] pb-4 last:border-none mb-4 pr-4">
              <Image
                className="aspect-square object-cover rounded-lg"
                src={item.image as string}
                alt={item.name}
                quality={25}
                width={300}
                height={300}
              ></Image>
              <div>
                <p className="font-black">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>
                  Total Price:{" "}
                  {formatPrice(
                    (item.unit_amount as number) * (item.quantity as number)
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className=" bg-black p-4 rounded-lg text-white">
          Check Out
        </button>
      </div>
    </div>
  );
}
