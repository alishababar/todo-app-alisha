import ReactMarkdown from "react-markdown";

type MessageBubbleProps = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  if (role === "system") return null;

  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}