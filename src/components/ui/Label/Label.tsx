import { forwardRef, LabelHTMLAttributes } from "react";
import styles from "./label.module.css";

const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`${styles.label} ${className}`.trim()}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
