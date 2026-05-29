type ChatInputProps = {
  input: string;
  setInput: React.Dispatch<
    React.SetStateAction<string>
  >;
  handleSubmit: (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 flex gap-2 bg-white pt-2"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI anything..."
        className="flex-1 rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}