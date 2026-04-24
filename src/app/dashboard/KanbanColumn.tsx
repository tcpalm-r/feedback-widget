"use client";
import { FeedbackCard, type FeedbackItem } from "./FeedbackCard";
import type { FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";
import { statusColors } from "./useDarkMode";

interface Props {
  status: FeedbackStatus;
  items: FeedbackItem[];
  dark: boolean;
  pendingId: string | null;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
}

export function KanbanColumn({ status, items, dark, pendingId, onStatusChange }: Props) {
  const c = statusColors(dark)[status];
  return (
    <div style={{
      flex: "1 1 220px", minWidth: 220, display: "flex", flexDirection: "column",
      background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, color: c.text, fontSize: 13 }}>
          {statusToSectionName(status)}
        </span>
        <span style={{ fontSize: 11, color: c.text, opacity: 0.75 }}>{items.length}</span>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {items.map((it) => (
          <FeedbackCard key={it.id} item={it} dark={dark}
            pending={pendingId === it.id} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}
