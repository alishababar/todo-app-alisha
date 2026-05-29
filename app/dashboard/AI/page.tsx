"use client";

import { useState } from "react";

import ChatInput from "@/components/ai/ChatInput";
import ChatWindow from "@/components/ai/chatwindow";

type Message = {
  id: string;
  role: "user" | "assistant";
  parts: {
    type: string;
    text: string;
  }[];
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [
        {
          type: "text",
          text: input,
        },
      ],
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        parts: [
          {
            type: "text",
            text: data.content,
          },
        ],
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          AI Assistant
        </h1>

        <p className="text-sm text-gray-500">
          Ask questions about your tasks
        </p>
      </div>

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}