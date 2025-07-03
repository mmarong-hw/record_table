import { cx } from "class-variance-authority";
import styles from "./DropdownItem.module.css";

interface Props {
  textColor?: "red" | "default";
  children: React.ReactNode;
}

export function DropdownItem({ children, textColor = "default" }: Props) {
  return <button className={cx(styles.clearButton, styles.dropdownItem, textColor === "red" && styles.textColorRed)}>{children}</button>;
}