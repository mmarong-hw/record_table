import { cx } from "class-variance-authority";
import styles from "./DropdownItem.module.css";

interface Props {
  textColor?: "red" | "default";
  children: React.ReactNode;
}

export function DropdownItem({ children, textColor = "default" }: Props) {
  return (
    <li className={styles.dropdownItemList}>
      <button className={cx(styles.dropdownItem, textColor === "red" && styles.textColorRed)} type="button">
        {children}
      </button>
    </li>
  );
}