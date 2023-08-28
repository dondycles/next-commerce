"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";
export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <body
          data-theme={themeStore.mode}
          className=" duration-300 py-4 px-4 md:px-16 scrollbar-thin scrollbar-thumb-base-content scrollbar-track-base-100"
        >
          {children}
        </body>
      ) : (
        <body
          data-theme={themeStore.mode}
          className=" min-h-[100dvh] w-full font-black text-2xl flex items-center justify-center"
        >
          Loading...
        </body>
      )}
    </>
  );
}
