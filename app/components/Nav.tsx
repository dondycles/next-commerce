"use client";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { signIn, signOut } from "next-auth/react";
import Cart from "./Cart";
import DarkLight from "./DarkLight";
import { useState } from "react";
import localFont from "next/font/local";
const accentFont = localFont({
  src: "../../public/OleoScript-Regular.ttf",
});
export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  const [openDropDrown, setOpenDropDown] = useState<Boolean>(false);
  return (
    <nav
      onBlur={() => setOpenDropDown(false)}
      className="fixed top-0 left-0 w-full py-4 px-4 md:px-16 text-primary flex justify-between items-center max-h-[80px] h-full bg-base-100 duration-300 "
    >
      <Link href={"/"}>
        <p
          className={`font-black text-3xl text-base-content ${accentFont.className}`}
        >
          Sveltered
        </p>
      </Link>
      <ul className="flex flex-row items-center gap-4">
        <li
          onClick={() => cartStore.toggleCart()}
          className=" text-3xl flex relative cursor-pointer"
        >
          <AiFillShopping />
          {cartStore.cart.length > 0 && (
            <AnimatePresence>
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                key={cartStore.cart.length}
                className=" text-secondary absolute text-xs font-black -right-2 -top-2 rounded-full aspect-square w-4 text-center"
              >
                {cartStore.cart.length}
              </motion.span>
            </AnimatePresence>
          )}
        </li>
        <li>
          <DarkLight />
        </li>
        {!user ? (
          <li className="btn btn-primary" onClick={() => signIn()}>
            Sign In
          </li>
        ) : (
          <li className="flex items-center justify-center  relative">
            <div className="cursor-pointer">
              <Image
                onClick={() => setOpenDropDown((prev) => !prev)}
                tabIndex={0}
                className="rounded-full"
                src={user?.image as string}
                width={36}
                height={36}
                alt={user.name as string}
              />
              <AnimatePresence>
                {openDropDrown && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0 }}
                    tabIndex={0}
                    className=" p-4 space-y-2 shadow bg-base-200 rounded-box absolute top-12 right-0"
                  >
                    <Link tabIndex={0} href={"/dashboard"}>
                      <li
                        onClick={() => {
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                          }
                        }}
                        className="  p-4 w-[100px] hover:bg-base-300 rounded-md"
                      >
                        {" "}
                        Orders
                      </li>
                    </Link>
                    <li
                      tabIndex={0}
                      onClick={() => {
                        signOut();
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                      className="  p-4 w-[100px] hover:bg-base-300 rounded-md"
                    >
                      Sign Out
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
