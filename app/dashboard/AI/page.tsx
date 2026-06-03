import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import AIChatClient from "@/components/ai/AIchatclient";

export default async function AIPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const conversation =
    await prisma.conversation.findFirst({
      where: {
        userId,
      },

      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  const initialMessages =
    conversation?.messages.map((message: { id: string; role: string; content: string }) => ({
      id: message.id,
      role: message.role,
      parts: [
        {
          type: "text",
          text: message.content,
        },
      ],
    })) || [];

  return (
    <AIChatClient
      initialMessages={initialMessages}
    />
  );
}