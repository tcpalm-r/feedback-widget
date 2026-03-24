"use client";

import { useDarkMode, darkModeColors } from "../dashboard/useDarkMode";

export default function ProjectEmpty({
  projectId,
  message,
}: {
  projectId?: string;
  message?: string;
}) {
  const { dark, toggleDark } = useDarkMode();
  const c = darkModeColors(dark);

  return (
    <div style={{ fontFamily: "monospace", padding: "20px", backgroundColor: c.bg, color: c.text, minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span />
        <button
          onClick={toggleDark}
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
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <p>No feedback found for project <strong>{projectId}</strong></p>
          <a href="/dashboard" style={{ color: c.link }}>← All projects</a>
        </>
      )}
    </div>
  );
}
