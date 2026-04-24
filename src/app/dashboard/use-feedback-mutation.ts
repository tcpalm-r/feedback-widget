"use client";
import { useCallback, useState } from "react";
import type { FeedbackStatus } from "@/lib/feedback-status";

export function useFeedbackMutation() {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const setStatus = useCallback(async (id: string, status: FeedbackStatus): Promise<boolean> => {
    setPendingId(id);
    try {
      const res = await fetch("/api/feedback/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      return res.ok;
    } finally {
      setPendingId(null);
    }
  }, []);

  return { setStatus, pendingId };
}
