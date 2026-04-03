import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, dueDate } = body;
    const taskCount = await prisma.task.count({
      where: { userId: session.user.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if ((!user?.subscriptionPlan || user.subscriptionPlan === "free") && taskCount >= 5) {
  return NextResponse.json(
    { error: "Free plan limit reached. Upgrade to Pro." },
    { status: 403 }
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
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
   const tasks = await prisma.task.findMany({
  orderBy: {
    createdAt: "desc",
  },
})

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

