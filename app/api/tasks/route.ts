import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, dueDate } = body;
    const taskCount = await prisma.task.count({
      where: { userId: session.user.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (
      (!user?.subscriptionPlan || user.subscriptionPlan === "free") &&
      taskCount >= 5
    ) {
      return NextResponse.json(
        { error: "Free plan limit reached. Upgrade to Pro." },
        { status: 403 },
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";

    const status = searchParams.get("status") || "";

    const priority = searchParams.get("priority") || "";

    const sort = searchParams.get("sort") || "createdAt_desc";

    const page = Number(searchParams.get("page") || 1);

    const limit = 10;

    const skip = (page - 1) * limit;

    const [field, order] = sort.split("_");

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

      ...(status && {
        status,
      }),

      ...(priority && {
        priority,
      }),
    };

    const tasks = await prisma.task.findMany({
      where,

      orderBy: {
        [field]: order as "asc" | "desc",
      },

      skip,

      take: limit,
    });

    const totalTasks = await prisma.task.count({
      where,
    });

    return NextResponse.json({
      tasks,

      currentPage: page,

      totalTasks,

      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch tasks",
      },
      {
        status: 500,
      },
    );
  }
}
