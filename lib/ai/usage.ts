import { prisma } from "@/lib/prisma";

export async function checkAIUsage(
  userId: string,
  isPro: boolean
) {
  if (isPro) {
    return {
      allowed: true,
    };
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  let usage = await prisma.aIUsage.findFirst({
    where: {
      userId,
      date: today,
    },
  });

  if (!usage) {
    usage = await prisma.aIUsage.create({
      data: {
        userId,
        date: today,
        count: 0,
      },
    });
  }

  if (usage.count >= 10) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    remaining: 10 - usage.count,
    usage,
  };
}

export async function incrementAIUsage(
  usageId: string
) {
  await prisma.aIUsage.update({
    where: {
      id: usageId,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
}