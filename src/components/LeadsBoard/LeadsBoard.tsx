"use client";

import { useMemo, useOptimistic, useState, useTransition } from "react";
import {
  FILTERS,
  ACTIVE_STATUSES,
  type FilterKey,
  type Lead,
  type LeadStatus,
} from "@/lib/leads/leads";
import { setLeadStatus, toggleLeadStar } from "@/app/(dashboard)/leads/actions";
import { LeadCard } from "./LeadCard";
import { AddLeadForm } from "./AddLeadForm";
import styles from "./leads-board.module.css";

type Patch = { id: string; changes: Partial<Lead> };

export function LeadsBoard({
  initialLeads,
  loadError,
}: {
  initialLeads: Lead[];
  loadError?: boolean;
}) {
  const [leads, patchLead] = useOptimistic<Lead[], Patch>(
    initialLeads,
    (state, { id, changes }) =>
      state.map((l) => (l.id === id ? { ...l, ...changes } : l))
  );
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<FilterKey>("active");
  const [starredOnly, setStarredOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length, active: 0 };
    leads.forEach((l) => {
      c[l.status] = (c[l.status] ?? 0) + 1;
      if (ACTIVE_STATUSES.includes(l.status)) c.active += 1;
    });
    return c;
  }, [leads]);

  const shown = leads.filter((l) => {
    if (filter === "active" && !ACTIVE_STATUSES.includes(l.status)) return false;
    if (filter !== "active" && filter !== "all" && l.status !== filter)
      return false;
    if (starredOnly && !l.starred) return false;
    if (q) {
      const hay = [l.game, l.stage, l.fit, l.contact, l.notes, l.source]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const starredActive = leads.filter(
    (l) => l.starred && ACTIVE_STATUSES.includes(l.status)
  ).length;

  function runStatus(lead: Lead, status: LeadStatus) {
    setActionError(null);
    startTransition(async () => {
      patchLead({
        id: lead.id,
        changes: { status, status_at: new Date().toISOString() },
      });
      try {
        await setLeadStatus(lead.id, status);
      } catch {
        setActionError("Couldn't save that change.");
      }
    });
  }

  function runStar(lead: Lead) {
    setActionError(null);
    startTransition(async () => {
      patchLead({ id: lead.id, changes: { starred: !lead.starred } });
      try {
        await toggleLeadStar(lead.id, !lead.starred);
      } catch {
        setActionError("Couldn't save that change.");
      }
    });
  }

  return (
    <div className={styles.board}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Indie RPG Leads</h1>
          <p className={styles.lede}>
            Star the ones worth chasing, set a status as you reach out, and keep
            notes on what you sent.
          </p>
        </header>

        <section className={styles.bar} aria-label="Filters">
          <div
            className={styles.chips}
            role="toolbar"
            aria-label="Filter by status"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={styles.chip}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className={styles.n}>{counts[f.key] ?? 0}</span>
              </button>
            ))}
          </div>
          <div className={styles.tools}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search games, stages, notes"
              aria-label="Search leads"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className={`${styles.chip} ${styles.starFilter}`}
              aria-pressed={starredOnly}
              onClick={() => setStarredOnly((s) => !s)}
            >
              ★ Starred <span className={styles.n}>{starredActive}</span>
            </button>
          </div>
        </section>

        {actionError && <div className={styles.actionError}>{actionError}</div>}

        {loadError ? (
          <div className={styles.notice}>
            <strong>Your leads couldn&rsquo;t be loaded.</strong> Reload the page
            to try again.
          </div>
        ) : leads.length === 0 ? (
          <div className={styles.notice}>
            <strong>No leads yet.</strong> Add one below to get started.
          </div>
        ) : shown.length === 0 ? (
          <div className={styles.notice}>No leads match this filter.</div>
        ) : (
          <div className={styles.list}>
            {shown.map((l) => (
              <LeadCard
                key={l.id}
                lead={l}
                onStatus={(status) => runStatus(l, status)}
                onStar={() => runStar(l)}
              />
            ))}
          </div>
        )}

        <AddLeadForm />
      </div>
    </div>
  );
}
