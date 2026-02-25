import Image from "next/image";
import Login from "@/components/ui/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Login></Login>
      
    </div>
  );
}
