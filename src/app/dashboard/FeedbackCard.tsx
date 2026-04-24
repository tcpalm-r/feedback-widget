"use client";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";

export interface FeedbackItem {
  id: string;
  app_id: string;
  type: string | null;
  message: string;
  initials: string | null;
  status: FeedbackStatus;
  elements: Array<{ url: string }> | null;
  metadata: { url?: string; timestamp?: string; userAgent?: string } | null;
  created_at: string;
}

interface Props {
  item: FeedbackItem;
  dark: boolean;
  pending: boolean;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
}

export function FeedbackCard({ item, dark, pending, onStatusChange }: Props) {
  const bg = dark ? "#0f172a" : "#ffffff";
  const border = dark ? "#1e293b" : "#e5e7eb";
  const fg = dark ? "#e2e8f0" : "#111827";
  const meta = dark ? "#94a3b8" : "#6b7280";

  return (
    <div style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 8,
      padding: 12, marginBottom: 8, opacity: pending ? 0.5 : 1,
    }}>
      <div style={{ fontSize: 12, color: fg, marginBottom: 6, whiteSpace: "pre-wrap" }}>
        {item.message}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: meta }}>
          {item.initials ?? "??"} · {new Date(item.created_at).toLocaleDateString()}
        </div>
        <select
          value={item.status}
          disabled={pending}
          onChange={(e) => onStatusChange(item.id, e.target.value as FeedbackStatus)}
          style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6 }}
        >
          {FEEDBACK_STATUSES.map((s) => (
            <option key={s} value={s}>{statusToSectionName(s)}</option>
          ))}
        </select>
      </div>
      {item.elements?.[0]?.url && (
        <a href={item.elements[0].url} target="_blank" rel="noopener"
           style={{ fontSize: 10, color: "#3b82f6", marginTop: 6, display: "inline-block" }}>
          Screenshot
        </a>
      )}
    </div>
  );
}
