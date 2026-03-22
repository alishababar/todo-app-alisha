import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import LogInForm from "@/components/ui/auth/login-form";
import RegisterForm from "@/components/ui/auth/register-form";

export default function Home() {
  return (
    <div>
      <LogInForm />
      <RegisterForm />
    </div>
  );
}