import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./input.module.css";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`${styles.input} ${className}`.trim()}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
