"use client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import Cart from "./Cart";
export default function Nav({ user }: Session) {
  const cartStore = useCartStore();

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-black text-white flex justify-between items-center max-h-[80px] h-full">
      <Link href={"/"}>
        <p className="font-black">Dondy-Commerce</p>
      </Link>
      <ul className="flex flex-row items-center gap-4">
        <li
          onClick={() => cartStore.toggleCart()}
          className=" text-3xl flex relative cursor-pointer"
        >
          <AiFillShopping />
          <span className=" text-red-400 absolute text-sm font-black -right-2 -top-2 bg-black rounded-full aspect-square w-4 text-center">
            {cartStore.cart.length}
          </span>
        </li>
        {!user ? (
          <li>
            <Link href={"/api/auth/signin"}>Sign In</Link>
          </li>
        ) : (
          <li className="flex items-center justify-center">
            <Link href={"/api/auth/signout"}>
              <Image
                className="rounded-full"
                src={user?.image as string}
                width={36}
                height={36}
                alt={user.name as string}
              />
            </Link>
          </li>
        )}
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  );
}
