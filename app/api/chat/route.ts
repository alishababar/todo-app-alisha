import { generateText, convertToModelMessages } from "ai";
import { model } from "../../../lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const modelMessages =
      await convertToModelMessages(messages);

    const { text } = await generateText({
      model,
      messages: modelMessages,
    });

    console.log("AI RESPONSE:", text);

    return Response.json({
      role: "assistant",
      content: text,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}