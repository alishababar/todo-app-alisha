"use client";

import { useState } from "react";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const inputStyle = (focused: boolean) => ({
        width: "100%",
        padding: "10px",
        border: `1.5px solid ${focused ? "#2d5fa8" : "#e4e8f0"}`,
        borderRadius: "12px",
        fontSize: "0.95rem",
        backgroundColor: "#fff",
        color: "#1a2540",
        outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(45, 95, 168, 0.2)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        fontFamily: "inherit",
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                maxWidth: "100vw",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f4ff",
                fontFamily: "DM Sans, Segoe UI, sans-serif",
            }}
        >

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
                @keyframes rise {
                from {
                    transform: translateY(24px)scale(0.97);}
                    to { opacity: 1; transform: translateY(0) scale(1);}
            }
                    .tf-btn {
                        display: block;
                        width: 100%;
                        padding: 15px;
                        background : #2d5fa8;
                        color: #fff;
                        border: none;
                        border-radius: 12px;
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .tf-btn:hover {
                        background-color: #2d5fa8;
                    }
            `}</style>
            <div style={{ width: "360px", padding: "40px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "24px", textAlign: "center" }}>Create an Account</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}   
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        style={inputStyle(emailFocused)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        style={inputStyle(passwordFocused)}
                    />
                    <input

                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setConfirmPasswordFocused(true)}
                        onBlur={() => setConfirmPasswordFocused(false)}
                        style={inputStyle(confirmPasswordFocused)}
                    />
                    <button className="tf-btn">Register</button>
                </div>
            </div>
        </div>
    );
}