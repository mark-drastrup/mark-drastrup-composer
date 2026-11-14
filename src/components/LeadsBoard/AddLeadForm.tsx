"use client";

import { useState, useTransition } from "react";
import { createLead } from "@/app/(dashboard)/leads/actions";
import styles from "./leads-board.module.css";

export function AddLeadForm() {
  const [msg, setMsg] = useState<{ text: string; error?: boolean }>({ text: "" });
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setMsg({ text: "Adding…" });
    startTransition(async () => {
      const res = await createLead(data);
      if (res.ok) {
        form.reset();
        setMsg({ text: "Added." });
      } else {
        setMsg({ text: res.error, error: true });
      }
    });
  }

  return (
    <details className={styles.add}>
      <summary>Add a lead yourself</summary>
      <form onSubmit={onSubmit} noValidate>
        <label className={styles.field}>
          Game
          <input
            name="game"
            required
            autoComplete="off"
            placeholder="e.g. Lanterns of Vael"
          />
        </label>
        <div className={styles.two}>
          <label className={styles.field}>
            Stage
            <input
              name="stage"
              autoComplete="off"
              placeholder="Steam page, demo, Kickstarter…"
            />
          </label>
          <label className={styles.field}>
            Link
            <input
              name="link"
              type="url"
              autoComplete="off"
              placeholder="https://"
            />
          </label>
        </div>
        <label className={styles.field}>
          Contact route
          <input
            name="contact"
            autoComplete="off"
            placeholder="Discord, email on press kit, Reddit DM…"
          />
        </label>
        <label className={styles.field}>
          Why it fits
          <textarea name="fit" rows={2} />
        </label>
        <button className={styles.btn} type="submit" disabled={isPending}>
          Add to board
        </button>
        <div
          className={`${styles.formMsg} ${msg.error ? styles.err : ""}`}
          aria-live="polite"
        >
          {msg.text}
        </div>
      </form>
    </details>
  );
}
