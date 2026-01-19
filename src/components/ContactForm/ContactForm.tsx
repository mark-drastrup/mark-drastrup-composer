"use client";

import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight } from "@/icons";
import styles from "./contact-form.module.css";
import { ThankYouMessage } from "../ThankYouMessage/ThankYouMessage";

export function ContactForm() {
  const [state, handleSubmit, reset] = useForm("xzzblqeb");

  if (state.succeeded) {
    return <ThankYouMessage reset={reset} />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles["contact-form"]}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className={styles.input}
        type="text"
        name="phone"
        placeholder="Phone"
      />
      <textarea
        className={styles.textarea}
        placeholder="Message"
        name="message"
        rows={5}
        required
      ></textarea>
      <button
        className={styles.button}
        type="submit"
        disabled={state.submitting}
      >
        Contact
        <div className={styles["botton-icon-wrapper"]}>
          <ArrowRight className={styles["button-icon"]} />
        </div>
      </button>
    </form>
  );
}
