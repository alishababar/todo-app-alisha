import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function createCheckoutSession(
  userId: string,
  plan: "pro" | "premium",
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  let customerId = user.stripeCustomerId;

  if (customerId) {
    try {
      await stripe.customers.retrieve(customerId);
    } catch (err) {
      console.warn("Stored Stripe customer not found. Will create a new one.");
      customerId = undefined;
    }
  }

  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email });
    customerId = customer.id;

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customerId },
    });
  }

  const priceId =
    plan === "pro"
      ? process.env.STRIPE_PRICE_PRO
      : process.env.STRIPE_PRICE_PREMIUM;
  if (!priceId)
    throw new Error(
      "Price ID not found. Make sure it's a recurring price and matches your environment.",
    );

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`,
  });

  return session.url!;
}
