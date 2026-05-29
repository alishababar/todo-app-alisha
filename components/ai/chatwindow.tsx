"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./messagebubble";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  parts?: {
    type: string;
    text?: string;
  }[];
};

type ChatWindowProps = {
  messages: Message[];
  isLoading: boolean;
};

export default function ChatWindow({
  messages,
  isLoading,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto rounded-2xl border bg-white p-4 shadow-sm">
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="flex h-100 flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold">
              AI Productivity Assistant 🚀
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Ask about your tasks, productivity,
              planning, or workflow ideas.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <div className="rounded-full border px-4 py-2 text-sm">
                Summarize my pending tasks
              </div>

              <div className="rounded-full border px-4 py-2 text-sm">
                Help prioritize my work
              </div>

              <div className="rounded-full border px-4 py-2 text-sm">
                Generate SEO tasks
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const textPart = message.parts?.find(
            (part) => part.type === "text"
          );

          return (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={textPart?.text || ""}
            />
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-500 shadow-sm">
              AI is thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}