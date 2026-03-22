// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function RegisterForm() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white p-4">
//       <Card className="w-full max-w-md shadow-xl border">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-bold text-blue-900">
//             Create Account
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label>Full Name</Label>
//             <Input
//               placeholder="Enter full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <Button className="w-full bg-blue-600 hover:bg-blue-700">
//             Create Account
//           </Button>

//           <p className="text-sm text-center text-gray-500">
//             Already have account?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  name: fullName, 
  email,
  password,
})      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      // Success → redirect or show message
      alert("Account created successfully!");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-blue-900">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Already have account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}