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
    <body>
      {isHydrated ? (
        <main data-theme={themeStore.mode} className=" duration-300">
          {children}
        </main>
      ) : (
        <div
          data-theme={themeStore.mode}
          className=" min-h-[100dvh] w-full font-black text-2xl flex items-center justify-center"
        >
          Loading...
        </div>
      )}
    </body>
  );
}
