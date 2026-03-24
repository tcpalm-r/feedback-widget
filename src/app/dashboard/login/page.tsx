"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode, darkModeColors } from "../useDarkMode";

export default function DashboardLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { dark, toggleDark } = useDarkMode();
  const c = darkModeColors(dark);

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
    <div style={{ fontFamily: "monospace", padding: "60px 20px", maxWidth: "320px", margin: "0 auto", backgroundColor: c.bg, color: c.text, minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontWeight: "bold" }}>Dashboard Login</h1>
        <button
          onClick={toggleDark}
          type="button"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "4px 10px",
            cursor: "pointer",
            backgroundColor: c.surface,
            color: c.text,
            border: `1px solid ${c.border}`,
          }}
        >
          {dark ? "light" : "dark"}
        </button>
      </div>
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
            border: `1px solid ${c.inputBorder}`,
            backgroundColor: c.inputBg,
            color: c.text,
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
            backgroundColor: c.surface,
            color: c.text,
            border: `1px solid ${c.border}`,
          }}
        >
          Login
        </button>
        {error && <p style={{ color: c.error, marginTop: "8px" }}>{error}</p>}
      </form>
    </div>
  );
}
