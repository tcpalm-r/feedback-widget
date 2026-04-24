"use client";

import { useState, useEffect, useCallback } from "react";
import type { FeedbackStatus } from "@/lib/feedback-status";

const STORAGE_KEY = "feedback-dashboard-dark-mode";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setDark(true);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      document.documentElement.style.backgroundColor = next ? "#121212" : "";
      document.documentElement.style.colorScheme = next ? "dark" : "";
      return next;
    });
  }, []);

  return { dark, toggleDark };
}

export function darkModeColors(dark: boolean) {
  return {
    bg: dark ? "#121212" : "#ffffff",
    text: dark ? "#e0e0e0" : "#000000",
    border: dark ? "#444" : "#ccc",
    borderStrong: dark ? "#666" : "#333",
    surface: dark ? "#1e1e2e" : "#eee",
    inputBg: dark ? "#2a2a3a" : "#ffffff",
    inputBorder: dark ? "#555" : "#ccc",
    link: dark ? "#5ca8ff" : "#0070f3",
    error: dark ? "#ff6b6b" : "red",
    typeBug: dark ? "#5c2020" : "#ffcccc",
    typeFeature: dark ? "#1a4d1a" : "#ccffcc",
    typeFuture: dark ? "#1a3a5c" : "#cce5ff",
    typeMisc: dark ? "#4d4d1a" : "#ffffcc",
    typeDefault: dark ? "#333333" : "#eeeeee",
    typeText: dark ? "#e0e0e0" : "#000000",
    imgBorder: dark ? "#555" : "#ccc",
    hr: dark ? "#444" : undefined,
  };
}

export interface StatusColors { bg: string; border: string; text: string; }

export function statusColors(dark: boolean): Record<FeedbackStatus, StatusColors> {
  // Light + dark tuple per status. Colour vibe: new=slate, feature=purple,
  // bug=red, development=amber, testing=blue, on_hold=gray, completed=green.
  return dark ? {
    new:         { bg: "#1e293b", border: "#334155", text: "#cbd5e1" },
    feature:     { bg: "#2e1065", border: "#4c1d95", text: "#ddd6fe" },
    bug:         { bg: "#450a0a", border: "#7f1d1d", text: "#fecaca" },
    development: { bg: "#451a03", border: "#78350f", text: "#fed7aa" },
    testing:     { bg: "#172554", border: "#1e3a8a", text: "#bfdbfe" },
    on_hold:     { bg: "#111827", border: "#1f2937", text: "#9ca3af" },
    completed:   { bg: "#052e16", border: "#14532d", text: "#bbf7d0" },
  } : {
    new:         { bg: "#f1f5f9", border: "#cbd5e1", text: "#334155" },
    feature:     { bg: "#f5f3ff", border: "#ddd6fe", text: "#6d28d9" },
    bug:         { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" },
    development: { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
    testing:     { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
    on_hold:     { bg: "#f9fafb", border: "#e5e7eb", text: "#4b5563" },
    completed:   { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534" },
  };
}
