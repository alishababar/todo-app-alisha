import { stripe } from "@/lib/stripe-server";
import { prisma } from "@/lib/prisma";

export async function stripeWebhook(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any;
      await prisma.user.update({
        where: { stripeCustomerId: session.customer },
        data: { subscriptionPlan: "pro" },
      });
      break;

    case "customer.subscription.deleted":
      const sub = event.data.object as any;
      await prisma.user.update({
        where: { stripeCustomerId: sub.customer },
        data: { subscriptionPlan: "free" },
      });
      break;
  }

  return new Response("Webhook received", { status: 200 });
}