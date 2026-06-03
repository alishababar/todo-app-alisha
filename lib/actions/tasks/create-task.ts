"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createTask(data: {
  title: string;
  description: string;
  dueDate: string;
}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
return{
  success: false,
  message: "Unauthorized",
  };
  }
     const userId = session.user.id;

    const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const isPro = user?.subscriptionPlan === "pro";

  const tasksCount = await prisma.task.count({
    where: { userId },
  });

  if (!isPro && tasksCount >= 5) {
    return {
      success: false,
      error: "Free users can only create up to 5 tasks. Upgrade to Pro.",
    };
  }

  await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      userId: session.user.id,
    },
  });

revalidatePath("/dashboard");

  return {
    success: true,
  };}