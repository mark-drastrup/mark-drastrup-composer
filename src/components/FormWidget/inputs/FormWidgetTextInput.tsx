import styles from "./inputs.module.css";

type TextInputProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
};

export function FormWidgetTextInput({
  name,
  placeholder,
  required,
}: TextInputProps) {
  return (
    <input
      className={styles.input}
      type="text"
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
}
