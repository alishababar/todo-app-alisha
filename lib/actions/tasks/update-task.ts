"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateTask(data: {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.task.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
    },
  });

  revalidatePath("/dashboard");
}