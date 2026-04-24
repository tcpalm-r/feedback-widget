import { FEEDBACK_STATUSES, FeedbackStatus, sectionNameToStatus } from "./feedback-status";

export interface AsanaSectionRef {
  gid: string;
  name: string;
}

export interface SectionMap {
  byStatus: Map<FeedbackStatus, string>;
  byGid: Map<string, FeedbackStatus>;
  missingStatuses: FeedbackStatus[];
}

export function buildSectionMap(sections: AsanaSectionRef[]): SectionMap {
  const byStatus = new Map<FeedbackStatus, string>();
  const byGid = new Map<string, FeedbackStatus>();

  for (const s of sections) {
    const status = sectionNameToStatus(s.name);
    if (!status) continue;
    byStatus.set(status, s.gid);
    byGid.set(s.gid, status);
  }

  const missingStatuses = FEEDBACK_STATUSES.filter((s) => !byStatus.has(s));
  return { byStatus, byGid, missingStatuses };
}

export function statusToGid(map: SectionMap, status: FeedbackStatus): string | undefined {
  return map.byStatus.get(status);
}

export function gidToStatus(map: SectionMap, gid: string): FeedbackStatus | undefined {
  return map.byGid.get(gid);
}
