import type { FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";
import { statusColors } from "./useDarkMode";

export function StatusBadge({ status, dark }: { status: FeedbackStatus; dark: boolean }) {
  const c = statusColors(dark)[status];
  return (
    <span
      style={{
        background: c.bg, border: `1px solid ${c.border}`, color: c.text,
        padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 500,
      }}
    >
      {statusToSectionName(status)}
    </span>
  );
}
