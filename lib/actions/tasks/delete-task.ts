"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: string) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");
}