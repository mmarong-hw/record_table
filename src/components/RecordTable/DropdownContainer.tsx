import styles from "./DropdownContainer.module.css";

export function DropdownContainer({ children }: { children: React.ReactNode }) {
  return <ul className={styles.container}>{children}</ul>;
}