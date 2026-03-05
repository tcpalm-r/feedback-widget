"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Wrong password");
      setPassword("");
    }
  };

  return (
    <div style={{ fontFamily: "monospace", padding: "60px 20px", maxWidth: "320px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>Dashboard Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "8px",
            width: "100%",
            border: "1px solid #ccc",
            marginBottom: "12px",
          }}
        />
        <button
          type="submit"
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "8px 16px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </form>
    </div>
  );
}
