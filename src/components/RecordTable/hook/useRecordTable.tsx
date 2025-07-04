import { baseFields, labelToKorean, type Label } from "../../../field/baseFields";
import type { ColumnType } from "antd/es/table";
import { type RecordDataType } from "../../../hook/useRecord";
import { Checkbox, Dropdown } from "antd";
import { DropdownContainer } from "../DropdownContainer";
import { DropdownItem } from "../DropdownItem";
import { MoreOutlined } from "@ant-design/icons";
import { Divider } from "../../Divider";
import { useRecordContext } from "../../Provider/RecordProvider";
import styles from "./useRecordTable.module.css"

export interface TableData {
  key: string;
  name: string;
  address: string;
  memo: string;
  registeredAt: string;
  job: string;
  emailAgreed: boolean;
}

function isTableData(data: RecordDataType): data is TableData {
  return (
    typeof data.name === "string" &&
    typeof data.address === "string" &&
    typeof data.memo === "string" &&
    typeof data.registeredAt === "string" &&
    typeof data.job === "string" &&
    typeof data.emailAgreed === "boolean"
  );
}

function makeTableData(records: RecordDataType[]): TableData[] {
  return records.map((record, index) => {
    const tableData = baseFields.reduce((prev, cur) => {
      prev[cur.label] = record[cur.label] ?? "";
      return prev;
    }, {} as Record<Label, string | boolean>);

    return {
      key: index.toString(),
      ...tableData,
    };
  }).filter(isTableData);
}

function makeFilters(tableData: TableData[], key: Label) {
  return tableData.map((data) => {
    const value = data[key];
    if (key === "emailAgreed") {
      return {
        text: value ? "선택됨" : "선택 안함",
        value,
      };
    }
    return {
      text: value,
      value,
    };
  });
}

function makeColumns(tableData: TableData[]): ColumnType<TableData>[] {
  return baseFields.map((field) => {
    const filters = makeFilters(tableData, field.label);
    const commonColumn = {
      title: labelToKorean(field.label),
      dataIndex: field.label,
      key: field.label,
      filters,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm
      }: {
        setSelectedKeys: (keys: React.Key[]) => void,
        selectedKeys: React.Key[],
        confirm: () => void
      }) => (
        <Checkbox.Group
          className={styles.filterDropdown}
          value={selectedKeys}
          onChange={(vals) => {
            setSelectedKeys(vals);
            confirm(); // 즉시 필터 적용
          }}
        >
          {filters.map(({ text, value }) => (
            <Checkbox key={text.toString()} className={styles.filterDropdownItem} value={value}>
              {text}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
      onFilter: (value: boolean | React.Key, record: TableData) => {
        if (typeof value === "string" && field.label !== "emailAgreed") {
          return record[field.label].includes(value);
        }

        if (field.label === "emailAgreed") {
          return record[field.label] === value;
        }

        return false;
      },
    };

    if (field.label === "emailAgreed") {
      return {
        ...commonColumn,
        render: (value: boolean) => <Checkbox checked={value} disabled />,
      };
    }

    return commonColumn;
  });
}

const makeDropdownColumn = ({
  onEdit,
  onDelete
}: {
  onEdit: (record: TableData) => void,
  onDelete: (record: TableData) => void
}): ColumnType<TableData> => {
  return {
    key: "action",
    render: (_text: string, record: TableData) => {
      return (
        <Dropdown
          overlay={
            <DropdownContainer>
              <DropdownItem onClick={() => onEdit(record)}>수정</DropdownItem>
              <Divider />
              <DropdownItem onClick={() => onDelete(record)} textColor="red">삭제</DropdownItem>
            </DropdownContainer>
          }
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      );
    },
  }
};

export function useRecordTable() {
  const { records, removeRecord } = useRecordContext();

  const tableData = makeTableData(records);

  const columns = makeColumns(tableData);

  columns.push(makeDropdownColumn({
    onEdit: (record: TableData) => {
      console.log(record);
    },
    onDelete: (record: TableData) => {
      removeRecord(Number(record.key));
    },
  }));

  return { columns, tableData };
}
