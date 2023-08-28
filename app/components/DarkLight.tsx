"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function DarkLight() {
  const themeStore = useThemeStore();

  return (
    <div
      onClick={() => {
        if (themeStore.mode === "light") {
          themeStore.toggleMode("dark");
        } else {
          themeStore.toggleMode("light");
        }
      }}
      className=" text-3xl cursor-pointer h-[30px] w-[30px] relative"
    >
      <AnimatePresence>
        {themeStore.mode === "light" ? (
          <motion.span
            key={themeStore.mode}
            initial={{ rotate: "90deg", scale: 0.5, opacity: 0 }}
            animate={{ rotate: "0deg", scale: 1, opacity: 1 }}
            className="absolute"
          >
            <MdOutlineDarkMode />
          </motion.span>
        ) : (
          <motion.span
            key={themeStore.mode}
            initial={{ rotate: "90deg", scale: 0.5, opacity: 0 }}
            animate={{ rotate: "0deg", scale: 1, opacity: 1 }}
            className="absolute"
          >
            <MdOutlineLightMode />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
