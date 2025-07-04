import { Checkbox } from "antd";
import styles from "./CheckboxGroup.module.css"
import type { FilterDropdownProps } from "antd/es/table/interface";

export function CheckboxGroup({ selectedKeys, filters, setSelectedKeys, confirm }: Pick<FilterDropdownProps, "selectedKeys" | "filters" | "setSelectedKeys" | "confirm">) {
  return (
    <Checkbox.Group
      className={styles.filterDropdown}
      value={selectedKeys}
      onChange={(vals) => {
        setSelectedKeys(vals);
        confirm(); // 즉시 필터 적용
      }}
    >
      {filters?.map(({ text, value }) => (
        <Checkbox key={text?.toString()} className={styles.filterDropdownItem} value={value}>
          {text}
        </Checkbox>
      ))}
    </Checkbox.Group>
  )
}