import { ArrowRight, LogoHalf } from "@/icons";
import styles from "./form-widget.module.css";

type FormWidgetProps = {
  title: string;
  description: string;
  submitButtonText: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function FormWidget({
  title,
  description,
  submitButtonText,
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
        {children}

        <button className={styles.button} type="submit">
          {submitButtonText}
          <div className={styles["botton-icon-wrapper"]}>
            <ArrowRight className={styles["button-icon"]} />
          </div>
        </button>
      </form>
    </div>
  );
}
