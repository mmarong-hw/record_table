import { baseFields, labelToKorean, type Label } from "../../../field/baseFields";
import { useRecords, type RecordDataType } from "../../../hook/useRecord";

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

export function useRecordTable() {
  const { records } = useRecords();

  const columns = baseFields.map((field) => ({
    title: labelToKorean(field.label),
    dataIndex: field.label,
    key: field.label,
  }));

  const tableData = makeTableData(records);

  return { columns, tableData };
}
