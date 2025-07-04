import { baseFields, labelToKorean, type Label } from "../../../field/baseFields";
import type { ColumnType } from "antd/es/table";
import { type RecordDataType } from "../../../hook/useRecord";
import { Checkbox } from "antd";
import { useRecordContext } from "../../Provider/RecordProvider";
import { Dropdown } from "./Dropdown";
import { CheckboxGroup } from "./CheckboxGroup";
import type { FilterDropdownProps } from "antd/es/table/interface";

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
    "name" in data &&
    "address" in data &&
    "memo" in data &&
    "registeredAt" in data &&
    "job" in data &&
    "emailAgreed" in data
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
      filterDropdown: ({ selectedKeys, filters, setSelectedKeys, confirm }: FilterDropdownProps) => (
        <CheckboxGroup
          selectedKeys={selectedKeys}
          filters={filters}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
        />
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
          onEdit={() => {
            onEdit(record);
          }}
          onDelete={() => {
            onDelete(record);
          }}
        />
      );
    },
  }
};

export function useRecordTable({
  onEdit,
  onDelete
}: {
  onEdit?: (record: TableData) => void,
  onDelete?: (record: TableData) => void
}) {
  const { records, removeRecord } = useRecordContext();

  const tableData = makeTableData(records);

  const columns = makeColumns(tableData);

  columns.push(makeDropdownColumn({
    onEdit: (record: TableData) => {
      onEdit?.(record);
    },
    onDelete: (record: TableData) => {
      removeRecord(Number(record.key));
      onDelete?.(record);
    },
  }));

  return { columns, tableData };
}
