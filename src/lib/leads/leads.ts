// Shared, framework-agnostic types + constants for the Indie RPG Leads board.
// Safe to import from both server and client (no server-only dependencies).

export const STATUSES = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "replied", label: "Replied" },
  { key: "talks", label: "In talks" },
  { key: "won", label: "Won" },
  { key: "nofit", label: "Not a fit" },
] as const;

export type LeadStatus = (typeof STATUSES)[number]["key"];

export const STATUS_LABEL = Object.fromEntries(
  STATUSES.map((s) => [s.key, s.label])
) as Record<LeadStatus, string>;

// Statuses counted as "still in play" by the Active filter.
export const ACTIVE_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "replied",
  "talks",
];

export const FILTERS = [
  { key: "active", label: "Active" },
  ...STATUSES,
  { key: "all", label: "All" },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];

export type Lead = {
  id: string;
  game: string;
  stage: string | null;
  fit: string | null;
  contact: string | null;
  link: string | null;
  source: string | null;
  found: string | null;
  status: LeadStatus;
  status_at: string | null;
  starred: boolean;
  notes: string | null;
  created_at: string;
};

export function isLeadStatus(v: string): v is LeadStatus {
  return STATUSES.some((s) => s.key === v);
}
