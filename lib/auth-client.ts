// export const signUp = async (name: string, email: string, password: string) => {
//   const res = await fetch("/api/auth/sign-up/email", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     console.error(data);
//     throw new Error("Sign up failed");
//   }

//   return data;
// };

// export const signIn = async (email: string, password: string) => {
//   const res = await fetch("/api/auth/sign-in/email", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     console.error(data);
//     throw new Error("Sign in failed");
//   }

//   return data;
// };

// export const signOut = async () => {
//   const res = await fetch("/api/auth/sign-out", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({})
//   });

//   if (!res.ok) {
//     throw new Error("Logout failed");
//   }

//   return res;
// };

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;