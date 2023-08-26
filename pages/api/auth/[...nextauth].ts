import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/util/prisma";
import Stripe from "stripe";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-08-16",
      });
      if (user.name && user.email) {
        const costumer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
        });

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: costumer.id,
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;

      return session;
    },
  },
};

export default NextAuth(options);
