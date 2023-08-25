import Nav from "./components/Nav";
import "./globals.css";
import localFont from "next/font/local";

import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
const myFont = localFont({ src: "../public/Oxygen-Regular.ttf" });

export const metadata = {
  title: "Next-Commerce",
  description: "My very first E-Commerce Web App!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
