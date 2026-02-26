import Image from "next/image";
import Login from "@/components/ui/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Todo App!</h1>
      <Login />
    </div>
  );
}
