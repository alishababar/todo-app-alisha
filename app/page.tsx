import Image from "next/image";
import Login from "@/components/ui/auth/login-form";
import RegisterForm from "@/components/ui/auth/register-form";
import Register from "./register/page";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Todo App!</h1>
      <Login />
    </div>
  );
}
