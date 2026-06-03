"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

import ChatWindow from "./chatwindow";
import ChatInput from "./ChatInput";

interface AIChatClientProps {
  initialMessages: any[];
}

export default function AIChatClient({
  initialMessages,
}: AIChatClientProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(
    null
  );

  const {
    messages,
    sendMessage,
    status,
  } = useChat({
    messages: initialMessages,

    onError(error) {
      console.log(error);

      if (
        error.message.includes(
          "Daily AI limit reached"
        )
      ) {
        setError(
          "Daily limit reached (10 prompts). Upgrade to Pro."
        );
      } else {
        setError(
          "AI request failed. Try again."
        );
      }
    },
  });

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!input.trim()) return;

    setError(null);

    await sendMessage({
      text: input,
    });

    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          AI Assistant
        </h1>

        <p className="text-sm text-muted-foreground">
          Ask questions about your tasks
        </p>

        {error && (
          <div className="mt-2 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      <ChatWindow
        messages={messages}
        isLoading={status === "streaming"}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={status === "streaming"}
      />
    </div>
  );
}