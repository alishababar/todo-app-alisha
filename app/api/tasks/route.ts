// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// export async function POST(req: Request) {
//   try {
//     const session = await auth.api.getSession({
//       headers: req.headers,
//     });

//     if (!session) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const { title, description, dueDate } = body;

//     const task = await prisma.task.create({
//       data: {
//         title,
//         description,
//         dueDate: new Date(dueDate),

//         user: {
//           connect: {
//             id: session.user.id,
//           },
//         },
//       },
//     });

//     return NextResponse.json(task);
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { error: "Failed to create task" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const tasks = await prisma.task.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // your auth logic...

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
