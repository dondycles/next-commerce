"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function DarkLight() {
  const themeStore = useThemeStore();

  return (
    <AnimatePresence>
      <motion.div
        key={themeStore.mode}
        initial={{ rotate: "30deg", scale: 0.5 }}
        animate={{ rotate: "0deg", scale: 1 }}
        onClick={() => {
          if (themeStore.mode === "light") {
            themeStore.toggleMode("dark");
          } else {
            themeStore.toggleMode("light");
          }
        }}
        className=" text-3xl cursor-pointer"
      >
        {themeStore.mode === "light" ? (
          <MdOutlineDarkMode />
        ) : (
          <MdOutlineLightMode />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
