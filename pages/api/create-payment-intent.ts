import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AddCartType } from "@/types/AddCartTypes";
import { prisma } from "@/util/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

const calculateTotal = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, options);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not Logged In!" });
    return;
  }

  const { items, payment_intent_id } = req.body;
  console.log(items, payment_intent_id);
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateTotal(items),
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateTotal(items) }
      );

      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentID: update_intent.id },
        include: { products: true },
      });
      if (!existing_order) {
        res.status(400).json({ message: "Invalid Payment Intent!" });
      }

      const updated_order = await prisma.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calculateTotal(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: update_intent });
      return;
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateTotal(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }
}
