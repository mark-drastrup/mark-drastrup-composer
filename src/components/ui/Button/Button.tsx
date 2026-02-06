import { forwardRef, ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={`${styles.button} ${className}`.trim()}
    {...props}
  />
));

Button.displayName = "Button";

export { Button };
