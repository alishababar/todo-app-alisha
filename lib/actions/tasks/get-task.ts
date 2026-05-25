"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getTasks(search?: string) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const trimmedSearch = search?.trim();

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,

      ...(trimmedSearch && {
        OR: [
          {
            title: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
}