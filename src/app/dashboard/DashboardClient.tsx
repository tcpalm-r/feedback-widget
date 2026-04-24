"use client";

import { useState } from "react";
import { useDarkMode, darkModeColors } from "./useDarkMode";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback-status";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  status: FeedbackStatus;
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

type StatusFilter = "all" | FeedbackStatus;

export default function DashboardClient({ grouped, total, singleProject }: Props) {
  const projects = Object.keys(grouped).sort();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    singleProject ? Object.fromEntries(projects.map((p) => [p, true])) : {}
  );
  const [items, setItems] = useState(grouped);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [statusFilters, setStatusFilters] = useState<Record<string, StatusFilter>>({});
  const [editingType, setEditingType] = useState<string | null>(null);
  const [updatingType, setUpdatingType] = useState<string | null>(null);
  const { dark, toggleDark } = useDarkMode();
  const c = darkModeColors(dark);

  const toggle = (projectId: string) => {
    setExpanded((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const typeOptions = ["bug", "feature", "future", "misc"];

  const updateType = async (item: FeedbackItem, newType: string) => {
    if (newType === item.type) {
      setEditingType(null);
      return;
    }
    setUpdatingType(item.id);
    const res = await fetch("/api/feedback/type", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, type: newType }),
    });
    if (res.ok) {
      setItems((prev) => {
        const next = { ...prev };
        next[item.app_id] = next[item.app_id].map((f) =>
          f.id === item.id ? { ...f, type: newType } : f
        );
        return next;
      });
    }
    setUpdatingType(null);
    setEditingType(null);
  };

  const updateStatus = async (item: FeedbackItem, newStatus: FeedbackStatus) => {
    if (newStatus === item.status) return;
    setUpdatingStatus(item.id);
    const res = await fetch("/api/feedback/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, status: newStatus }),
    });
    if (res.ok) {
      setItems((prev) => {
        const next = { ...prev };
        next[item.app_id] = next[item.app_id].map((f) =>
          f.id === item.id ? { ...f, status: newStatus } : f
        );
        return next;
      });
    }
    setUpdatingStatus(null);
  };

  const downloadCSV = () => {
    const allItems = Object.values(items).flat();
    const headers = ["Date", "Project", "Type", "Initials", "Message", "Source URL", "Status", "Screenshot URLs"];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = allItems.map((item) => [
      new Date(item.created_at).toLocaleString(),
      item.app_id,
      item.type,
      item.initials || "",
      item.message,
      item.metadata?.url || "",
      item.status,
      (item.elements || []).map((el) => el.url).join(" | "),
    ].map(escape).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const typeColor = (type: string) =>
    type === "bug" ? c.typeBug
    : type === "feature" ? c.typeFeature
    : type === "future" ? c.typeFuture
    : type === "misc" ? c.typeMisc
    : c.typeDefault;

  return (
    <div style={{ backgroundColor: c.bg, color: c.text, minHeight: "100vh" }}>
    <div style={{ fontFamily: "monospace", padding: "20px", width: "1400px", minWidth: "1400px", fontSize: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold" }}>
          User Feedback{singleProject && projects.length === 1 ? ` - ${projects[0]}` : ""}
        </h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={downloadCSV}
            title="Download all feedback as CSV"
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
            export csv
          </button>
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
      </div>
      <p>Total: {total} entries{singleProject ? "" : ` across ${projects.length} projects`}</p>
      <hr style={{ marginBottom: "16px", borderColor: c.hr }} />

      {projects.map((projectId) => (
        <div key={projectId} style={{ marginBottom: "20px" }}>
          {singleProject ? null : (
            <h2
              onClick={() => toggle(projectId)}
              style={{
                backgroundColor: c.surface,
                color: c.text,
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
                <tr style={{ textAlign: "left", borderBottom: `2px solid ${c.borderStrong}` }}>
                  <th style={{ padding: "8px" }}>Date</th>
                  <th style={{ padding: "8px" }}>Type</th>
                  <th style={{ padding: "8px" }}>Initials</th>
                  <th style={{ padding: "8px" }}>Message</th>
                  <th style={{ padding: "8px" }}>Screenshots</th>
                  <th style={{ padding: "8px" }}>Source URL</th>
                  <th style={{ padding: "8px", textAlign: "center" }}>
                    <select
                      value={statusFilters[projectId] || "all"}
                      onChange={(e) => setStatusFilters((prev) => ({ ...prev, [projectId]: e.target.value as StatusFilter }))}
                      style={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        fontSize: "inherit",
                        background: "none",
                        color: c.text,
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        width: "100%",
                      }}
                    >
                      <option value="all">Status</option>
                      {FEEDBACK_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(items[projectId] || [])
                  .filter((item) => {
                    const filter = statusFilters[projectId] || "all";
                    return filter === "all" ? true : item.status === filter;
                  })
                  .map((item) => (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${c.border}` }}>
                    <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {editingType === item.id ? (
                        <select
                          autoFocus
                          value={item.type}
                          onChange={(e) => updateType(item, e.target.value)}
                          onBlur={() => setEditingType(null)}
                          disabled={updatingType === item.id}
                          style={{
                            fontFamily: "monospace",
                            fontSize: "12px",
                            padding: "2px 4px",
                            cursor: "pointer",
                            backgroundColor: c.inputBg,
                            color: c.text,
                            border: `1px solid ${c.inputBorder}`,
                          }}
                        >
                          {typeOptions.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          onClick={() => setEditingType(item.id)}
                          title="Click to change type"
                          style={{
                            backgroundColor: typeColor(item.type),
                            color: c.typeText,
                            padding: "2px 6px",
                            cursor: "pointer",
                            opacity: updatingType === item.id ? 0.4 : 1,
                          }}
                        >
                          {item.type}
                        </span>
                      )}
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
                                  border: `1px solid ${c.imgBorder}`,
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
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item, e.target.value as FeedbackStatus)}
                        disabled={updatingStatus === item.id}
                        title="Change status"
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          padding: "2px 4px",
                          cursor: updatingStatus === item.id ? "default" : "pointer",
                          backgroundColor: c.inputBg,
                          color: c.text,
                          border: `1px solid ${c.inputBorder}`,
                          opacity: updatingStatus === item.id ? 0.4 : 1,
                          width: "100%",
                        }}
                      >
                        {FEEDBACK_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}
