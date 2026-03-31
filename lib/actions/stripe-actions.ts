"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe-server";

export async function handleCheckout(plan: "pro" | "premium") {
  const session = await auth.api.getSession({
  headers: await headers(),
});

  if (!session?.user) {
    throw new Error("User not logged in");
  }

  const userId = session.user.id;

  return await createCheckoutSession(userId, plan);
}