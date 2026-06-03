import {
  streamText,
  convertToModelMessages,
} from "ai";

import { model } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    checkAIUsage,
    incrementAIUsage
} from "@/lib/ai/usage";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });


    if (!session?.user?.id) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const isPro = user?.subscriptionPlan === "pro";

    const usageResult = await checkAIUsage(userId, isPro);
    if (!usageResult.allowed) {
      return Response.json(
        {
            error: "AI usage limit reached. Upgrade to Pro for unlimited access.",
        },
        {
          status: 403,
        }
      );
    }
    const { messages } = await req.json();
    

    const latestMessage =
      messages[messages.length - 1];

    let conversation =
      await prisma.conversation.findFirst({
        where: {
          userId,
        },
      });

    if (!conversation) {
      conversation =
        await prisma.conversation.create({
          data: {
            userId,
          },
        });
    }

    if (latestMessage?.parts?.[0]?.text) {
      await prisma.message.create({
        data: {
          role: "user",
          content: latestMessage.parts[0].text,
          conversationId: conversation.id,
        },
      });
    }

    const tasks: {
  title: string;
  status: string;
  priority: string;
}[] = await prisma.task.findMany({
    where: {
      userId,
    },
  take: 10,
  orderBy: {
    createdAt: "desc",
  },
});

if (!isPro && usageResult.usage?.id) {
      await incrementAIUsage(usageResult.usage.id);
    }

    const taskContext =
      tasks.length > 0
        ? tasks
            .map(
              (t, i) =>
                `${i + 1}. ${t.title} - ${t.status} - ${t.priority}`
            )
            .join("\n")
        : "No tasks found";

    const modelMessages =
      await convertToModelMessages(messages);

    const result = streamText({
      model,
      messages: modelMessages,

      system: `
You are a productivity AI assistant inside a SaaS todo application.

Use the user's tasks to help with:
- prioritization
- productivity
- planning
- task summaries

User Tasks:
${taskContext}
      `,

      async onFinish(event) {
        const assistantText = event.text;

        if (assistantText) {
          await prisma.message.create({
            data: {
              role: "assistant",
              content: assistantText,
              conversationId:
                conversation.id,
            },
          });
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}