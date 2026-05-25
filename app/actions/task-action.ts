"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getTasks({
  search = "",
  status = "",
  priority = "",
  sortBy = "createdAt",
  order = "desc",
  page = 1,
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const limit = 10;

  const skip = (page - 1) * limit;

  const where = {
    userId: session.user.id,

    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(status && { status }),

    ...(priority && { priority }),
  };

  const tasks = await prisma.task.findMany({
    where,

    orderBy: {
      [sortBy]: order,
    },

    skip,

    take: limit,
  });

  const totalTasks = await prisma.task.count({
    where,
  });

  return {
    tasks,
    totalTasks,

    currentPage: page,

    totalPages: Math.ceil(totalTasks / limit),
  };
}
