"use client";
import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";
export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (isHydrated)
    return (
      <body
        data-theme={themeStore.mode}
        className=" duration-300 py-4 px-4 md:px-16 scrollbar-thin scrollbar-thumb-base-content scrollbar-track-base-100 min-h-[100dvh] bg-base-300"
      >
        {children}
        <p className=" text-xs text-center pt-4 text-base-content/25">
          Made by dondycles
        </p>
      </body>
    );
}
