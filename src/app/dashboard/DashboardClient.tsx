"use client";

import { useState } from "react";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  elements: Array<{
    url: string;
    region?: { x: number; y: number; width: number; height: number };
  }> | null;
  metadata: {
    url?: string;
    timestamp?: string;
    userAgent?: string;
  } | null;
  created_at: string;
}

interface Props {
  grouped: Record<string, FeedbackItem[]>;
  total: number;
}

export default function DashboardClient({ grouped, total }: Props) {
  const projects = Object.keys(grouped).sort();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (projectId: string) => {
    setExpanded((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <div style={{ fontFamily: "monospace", padding: "20px", maxWidth: "1200px" }}>
      <h1 style={{ fontWeight: "bold" }}>User Feedback</h1>
      <p>Total: {total} entries across {projects.length} projects</p>
      <hr />

      {projects.map((projectId) => (
        <div key={projectId} style={{ marginBottom: "20px" }}>
          <h2
            onClick={() => toggle(projectId)}
            style={{
              backgroundColor: "#eee",
              padding: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {expanded[projectId] ? "▼" : "▶"} {projectId} ({grouped[projectId].length})
          </h2>

          {expanded[projectId] && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #333" }}>
                  <th style={{ padding: "8px" }}>Date</th>
                  <th style={{ padding: "8px" }}>Type</th>
                  <th style={{ padding: "8px" }}>Initials</th>
                  <th style={{ padding: "8px" }}>Message</th>
                  <th style={{ padding: "8px" }}>Screenshots</th>
                  <th style={{ padding: "8px" }}>Source URL</th>
                </tr>
              </thead>
              <tbody>
                {grouped[projectId].map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <span
                        style={{
                          backgroundColor:
                            item.type === "bug"
                              ? "#ffcccc"
                              : item.type === "feature"
                              ? "#ccffcc"
                              : "#ffffcc",
                          padding: "2px 6px",
                        }}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: "8px", textTransform: "uppercase" }}>
                      {item.initials || "-"}
                    </td>
                    <td style={{ padding: "8px", maxWidth: "400px" }}>{item.message}</td>
                    <td style={{ padding: "8px" }}>
                      {item.elements && item.elements.length > 0 ? (
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {item.elements.map((el, i) => (
                            <a
                              key={i}
                              href={el.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={el.url}
                                alt={`Screenshot ${i + 1}`}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  border: "1px solid #ccc",
                                }}
                              />
                            </a>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={{ padding: "8px", fontSize: "12px" }}>
                      {item.metadata?.url || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
