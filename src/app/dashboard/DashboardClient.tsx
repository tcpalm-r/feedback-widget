"use client";
import { useMemo, useState } from "react";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback-status";
import { useDarkMode } from "./useDarkMode";
import { useFeedbackMutation } from "./use-feedback-mutation";
import { KanbanColumn } from "./KanbanColumn";
import type { FeedbackItem } from "./FeedbackCard";

interface Props {
  items: FeedbackItem[];
  total: number;
  appIds: string[];
}

export default function DashboardClient({ items, total, appIds }: Props) {
  const { dark, toggleDark } = useDarkMode();
  const [appFilter, setAppFilter] = useState<string>("all");
  const [localItems, setLocalItems] = useState(items);
  const { setStatus, pendingId } = useFeedbackMutation();

  const filtered = useMemo(
    () => appFilter === "all" ? localItems : localItems.filter((i) => i.app_id === appFilter),
    [localItems, appFilter],
  );

  const grouped = useMemo(() => {
    const g: Record<FeedbackStatus, FeedbackItem[]> = {
      new: [], feature: [], bug: [], development: [], testing: [], on_hold: [], completed: [],
    };
    for (const it of filtered) g[it.status].push(it);
    return g;
  }, [filtered]);

  const handleStatusChange = async (id: string, status: FeedbackStatus) => {
    const prev = localItems;
    setLocalItems(localItems.map((it) => it.id === id ? { ...it, status } : it)); // optimistic
    const ok = await setStatus(id, status);
    if (!ok) setLocalItems(prev); // rollback
  };

  const bg = dark ? "#0f172a" : "#f3f4f6";
  const fg = dark ? "#f1f5f9" : "#111827";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: fg, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Feedback</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{filtered.length} of {total} items</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={appFilter} onChange={(e) => setAppFilter(e.target.value)}
            style={{ padding: "4px 8px", borderRadius: 6 }}>
            <option value="all">All apps</option>
            {appIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
          <button onClick={toggleDark} style={{ padding: "4px 10px", borderRadius: 6 }}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>
      <div style={{ display: "flex", gap: 10, flex: 1, overflow: "auto" }}>
        {FEEDBACK_STATUSES.map((s) => (
          <KanbanColumn key={s} status={s} items={grouped[s]} dark={dark}
            pendingId={pendingId} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}
