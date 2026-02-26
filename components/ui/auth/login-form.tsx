"use client";

import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <form onSubmit={handleSubmit}
         className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-5">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <div className="space-y-2">
                <label htmlFor="email" className=" text-sm font-medium text-gray-700">Email</label>
                <input

                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    placeholder="youremail@example.com"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input  
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    placeholder="°°°°°°°°"
                />
            </div>
            <button

                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Login
            </button>

            <p className="mt-4 text-sm text-gray-600 text-center">
                Don't have an account? <a href="register" className="text-blue-500 hover:underline">Register</a>
            </p>
        </form>
    );
}