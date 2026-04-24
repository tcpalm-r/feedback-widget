/** Read Type and Severity custom-field values off an Asana task. */

export interface AsanaCustomFieldEntry {
  gid: string;
  enum_value?: { gid?: string; name?: string } | null;
}

export interface ProjectCustomFieldsConfig {
  type?: string;
  severity?: string;
  enum_options?: {
    type?: Record<string, string>;
    severity?: Record<string, string>;
  };
}

export interface ExtractedTriageFields {
  type?: string;
  severity?: string;
}

function invertMap(m: Record<string, string> | undefined): Map<string, string> {
  const inv = new Map<string, string>();
  if (!m) return inv;
  for (const [name, gid] of Object.entries(m)) inv.set(gid, name);
  return inv;
}

export function extractTypeAndSeverity(
  customFields: AsanaCustomFieldEntry[],
  config: ProjectCustomFieldsConfig,
): ExtractedTriageFields {
  const result: ExtractedTriageFields = {};
  const typeOptionByGid = invertMap(config.enum_options?.type);
  const severityOptionByGid = invertMap(config.enum_options?.severity);

  for (const cf of customFields) {
    if (!cf?.enum_value?.gid) continue;
    if (cf.gid === config.type) {
      const name = typeOptionByGid.get(cf.enum_value.gid);
      if (name) result.type = name;
    } else if (cf.gid === config.severity) {
      const name = severityOptionByGid.get(cf.enum_value.gid);
      if (name) result.severity = name;
    }
  }

  return result;
}
