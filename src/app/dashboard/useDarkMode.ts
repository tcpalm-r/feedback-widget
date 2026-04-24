"use client";

import { useState, useEffect, useCallback } from "react";

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

