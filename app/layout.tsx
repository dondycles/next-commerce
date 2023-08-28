import Nav from "./components/Nav";
import "./globals.css";
import localFont from "next/font/local";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
const myFont = localFont({ src: "../public/Poppins-Regular.ttf" });

export const metadata = {
  title: "Sveltered",
  description: "My very first E-Commerce Web App!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className={`${myFont.className}`}>
      <>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </>
    </html>
  );
}
