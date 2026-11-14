"use client";

import { useState, useTransition } from "react";
import { STATUSES, type Lead, type LeadStatus } from "@/lib/leads/leads";
import { setLeadNotes } from "@/app/(dashboard)/leads/actions";
import styles from "./leads-board.module.css";

function fmtDate(s: string | null) {
  if (!s) return "";
  const d = new Date(s.slice(0, 10) + "T12:00:00");
  return isNaN(d.getTime())
    ? s
    : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function safeUrl(u: string | null) {
  const t = (u ?? "").trim();
  return /^https?:\/\//i.test(t) ? t : null;
}

export function LeadCard({
  lead,
  onStatus,
  onStar,
}: {
  lead: Lead;
  onStatus: (status: LeadStatus) => void;
  onStar: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [saved, setSaved] = useState("");
  const [, startTransition] = useTransition();
  const href = safeUrl(lead.link);

  function saveNotes() {
    if (notes === (lead.notes ?? "")) return;
    setSaved("Saving…");
    startTransition(async () => {
      try {
        await setLeadNotes(lead.id, notes);
        setSaved("Saved");
      } catch {
        setSaved("Couldn’t save");
      }
    });
  }

  return (
    <article
      className={[
        styles.lead,
        lead.starred ? styles.starred : "",
        lead.status === "nofit" ? styles.dim : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.top}>
        <button
          type="button"
          className={styles.star}
          aria-pressed={lead.starred}
          aria-label={(lead.starred ? "Unstar " : "Star ") + lead.game}
          onClick={onStar}
        >
          ★
        </button>
        <div className={styles.title}>
          <h2 className={styles.game}>{lead.game}</h2>
          <div className={styles.meta}>
            {lead.stage && <span className={styles.stage}>{lead.stage}</span>}
            {lead.source && <span>{lead.source}</span>}
            {lead.found && (
              <span className={styles.date}>Found {fmtDate(lead.found)}</span>
            )}
          </div>
        </div>
        <select
          className={styles.status}
          aria-label={"Status for " + lead.game}
          style={{ "--s": `var(--s-${lead.status})` } as React.CSSProperties}
          value={lead.status}
          onChange={(e) => onStatus(e.target.value as LeadStatus)}
        >
          {STATUSES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {(lead.fit || lead.contact || href) && (
        <dl className={styles.dl}>
          {lead.fit && (
            <div className={styles.row}>
              <dt>Why it fits</dt>
              <dd>{lead.fit}</dd>
            </div>
          )}
          {lead.contact && (
            <div className={styles.row}>
              <dt>Contact</dt>
              <dd>{lead.contact}</dd>
            </div>
          )}
          {href && (
            <div className={styles.row}>
              <dt>Link</dt>
              <dd>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {href.replace(/^https?:\/\/(www\.)?/i, "").slice(0, 70)} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}

      <textarea
        className={styles.notes}
        rows={2}
        aria-label={"Notes for " + lead.game}
        placeholder="Notes: what you sent, when to follow up"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={saveNotes}
      />
      <div className={styles.saved} aria-live="polite">
        {saved}
      </div>
    </article>
  );
}
