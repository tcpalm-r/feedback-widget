/** Canonical feedback status enum — one key per Template A Asana section. Imported by webhooks, cron, API, and dashboard. */
export const FEEDBACK_STATUSES = [
  "new",
  "feature",
  "bug",
  "development",
  "testing",
  "on_hold",
  "completed",
] as const;

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

const STATUS_SET: ReadonlySet<string> = new Set(FEEDBACK_STATUSES);

const SECTION_NAME_BY_STATUS: Record<FeedbackStatus, string> = {
  new: "New",
  feature: "Feature",
  bug: "Bug",
  development: "Development",
  testing: "Testing",
  on_hold: "On Hold",
  completed: "Completed",
};

const STATUS_BY_SECTION_KEY: Record<string, FeedbackStatus> = FEEDBACK_STATUSES.reduce<
  Record<string, FeedbackStatus>
>((acc, s) => {
  acc[SECTION_NAME_BY_STATUS[s].toLowerCase()] = s;
  return acc;
}, {});

export function isFeedbackStatus(v: unknown): v is FeedbackStatus {
  return typeof v === "string" && STATUS_SET.has(v);
}

export function sectionNameToStatus(name: string): FeedbackStatus | undefined {
  return STATUS_BY_SECTION_KEY[name.trim().toLowerCase()];
}

export function statusToSectionName(status: FeedbackStatus): string {
  return SECTION_NAME_BY_STATUS[status];
}

const RESOLVED: ReadonlySet<FeedbackStatus> = new Set(["testing", "completed"]);
export function isResolvedStatus(status: FeedbackStatus): boolean {
  return RESOLVED.has(status);
}
