import styles from "./thank-you-message.module.css";

type ThankYouMessageProps = {
  reset: () => void;
};

export function ThankYouMessage({ reset }: ThankYouMessageProps) {
  return (
    <div className={styles["thank-you"]}>
      <h3 className={styles.title}>Message Sent</h3>

      <p className={styles.parapgrah}>
        Thank you for reaching out to me! I will get back to you as soon as
        possible.
      </p>

      <div onClick={reset}>Reset form</div>
    </div>
  );
}
