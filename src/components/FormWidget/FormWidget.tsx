import { ArrowRight, LogoHalf } from "@/icons";
import styles from "./form-widget.module.css";

type FormWidgetProps = {
  title: string;
  description: string;
  submitButtonText: string;
  isLoading: boolean;
  successMessage?: string;
  errorMessage?: string;
  leadMagnetId?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function FormWidget({
  title,
  description,
  submitButtonText,
  successMessage,
  isLoading,
  errorMessage,
  leadMagnetId,
  children,
  onSubmit,
}: FormWidgetProps) {
  return (
    <div className={styles["form-widget"]}>
      <div>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.paragraph}>{description}</p>

        <LogoHalf className={styles.logo} />
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles["form-fields"]}>
          {children}

          {errorMessage && (
            <p className={styles["error-message"]}>{errorMessage}</p>
          )}
          {successMessage && (
            <p className={styles["success-message"]}>{successMessage}</p>
          )}
        </div>

        <button className={styles.button} type="submit" disabled={isLoading}>
          {submitButtonText}
          <div className={styles["botton-icon-wrapper"]}>
            <ArrowRight className={styles["button-icon"]} />
          </div>
        </button>

        <input type="hidden" name="lead-magnet" value={leadMagnetId} />
      </form>
    </div>
  );
}
