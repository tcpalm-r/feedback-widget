"use client";

import { useState } from "react";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  resolved: boolean;
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
  singleProject?: boolean;
}

export default function DashboardClient({ grouped, total, singleProject }: Props) {
  const projects = Object.keys(grouped).sort();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    singleProject ? Object.fromEntries(projects.map((p) => [p, true])) : {}
  );
  const [items, setItems] = useState(grouped);
  const [toggling, setToggling] = useState<string | null>(null);
  const [resolvedFilters, setResolvedFilters] = useState<Record<string, "all" | "unresolved" | "resolved">>({});

  const toggle = (projectId: string) => {
    setExpanded((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const toggleResolved = async (item: FeedbackItem) => {
    setToggling(item.id);
    const newResolved = !item.resolved;
    const res = await fetch("/api/feedback/resolve", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, resolved: newResolved }),
    });
    if (res.ok) {
      setItems((prev) => {
        const next = { ...prev };
        next[item.app_id] = next[item.app_id].map((f) =>
          f.id === item.id ? { ...f, resolved: newResolved } : f
        );
        return next;
      });
    }
    setToggling(null);
  };

  return (
    <div style={{ fontFamily: "monospace", padding: "20px", width: "1400px", minWidth: "1400px", fontSize: "11px" }}>
      <h1 style={{ fontWeight: "bold" }}>User Feedback</h1>
      <p>Total: {total} entries across {projects.length} projects</p>
      <hr style={{ marginBottom: "16px" }} />

      {projects.map((projectId) => (
        <div key={projectId} style={{ marginBottom: "20px" }}>
          {singleProject ? (
            <h2 style={{ padding: "10px 0" }}>
              {projectId} ({(items[projectId] || []).length})
            </h2>
          ) : (
            <h2
              onClick={() => toggle(projectId)}
              style={{
                backgroundColor: "#eee",
                padding: "10px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {expanded[projectId] ? "▼" : "▶"} {projectId} ({(items[projectId] || []).length})
            </h2>
          )}

          {expanded[projectId] && (
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "190px" }} />
                <col style={{ width: "90px" }} />
                <col style={{ width: "80px" }} />
                <col style={{ width: "420px" }} />
                <col style={{ width: "100px" }} />
                <col style={{ width: "250px" }} />
                <col style={{ width: "140px" }} />
              </colgroup>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #333" }}>
                  <th style={{ padding: "8px" }}>Date</th>
                  <th style={{ padding: "8px" }}>Type</th>
                  <th style={{ padding: "8px" }}>Initials</th>
                  <th style={{ padding: "8px" }}>Message</th>
                  <th style={{ padding: "8px" }}>Screenshots</th>
                  <th style={{ padding: "8px" }}>Source URL</th>
                  <th style={{ padding: "8px", textAlign: "center" }}>
                    <select
                      value={resolvedFilters[projectId] || "all"}
                      onChange={(e) => setResolvedFilters((prev) => ({ ...prev, [projectId]: e.target.value as "all" | "unresolved" | "resolved" }))}
                      style={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        fontSize: "inherit",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        width: "100%",
                      }}
                    >
                      <option value="all">Resolved?</option>
                      <option value="unresolved">Unresolved</option>
                      <option value="resolved">Resolved Only</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(items[projectId] || [])
                  .filter((item) => {
                    const filter = resolvedFilters[projectId] || "all";
                    return filter === "all" ? true :
                      filter === "unresolved" ? !item.resolved :
                      item.resolved;
                  })
                  .map((item) => (
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
                              : item.type === "future"
                              ? "#cce5ff"
                              : item.type === "misc"
                              ? "#ffffcc"
                              : "#eeeeee",
                          padding: "2px 6px",
                        }}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: "8px", textTransform: "uppercase" }}>
                      {item.initials || "-"}
                    </td>
                    <td style={{ padding: "8px", wordBreak: "break-word" }}>{item.message}</td>
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
                    <td style={{ padding: "8px", wordBreak: "break-all" }}>
                      {item.metadata?.url || "-"}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      <span
                        onClick={() => toggling !== item.id && toggleResolved(item)}
                        style={{
                          cursor: toggling === item.id ? "default" : "pointer",
                          opacity: toggling === item.id ? 0.4 : 1,
                          fontFamily: "monospace",
                          fontSize: "11px",
                        }}
                        title={item.resolved ? "Mark as unresolved" : "Mark as resolved"}
                      >
                        {item.resolved ? "[x]" : "[ ]"}
                      </span>
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
