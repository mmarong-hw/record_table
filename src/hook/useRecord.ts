import { useState } from "react";
import type { FormValueType } from "../components/RecordForm/formValueType";
import dayjs, { isDayjs } from "dayjs";
import type { Label } from "../field/baseFields";

export type RecordDataType = Record<Label, string | boolean>;

const dummyRecords = [
  {
    key: "1",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    registeredAt: "2024-10-02",
    job: "개발자",
    emailAgreed: true,
  },
  {
    key: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    registeredAt: "2024-10-01",
    job: "PO",
    emailAgreed: false,
  },
];

export function useRecords() {
  const [records, setRecords] = useState<RecordDataType[]>(dummyRecords);

  const addRecord = (form: FormValueType) => {
    setRecords(prev => [...prev, formToRecord(form)]);
  }

  const removeRecord = (index: number) => {
    setRecords(prev => prev.filter((_, i) => i !== index));
  }

  const updateRecord = (index: number, form: FormValueType) => {
    setRecords(prev => prev.map((record, i) => i === index ? formToRecord(form) : record));
  }

  return { records, addRecord, removeRecord, updateRecord };
}

function formToRecord(form: FormValueType): RecordDataType {
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => [
      key,
      isDayjs(value) ? value.format("YYYY-MM-DD") : value
    ])
  ) as RecordDataType;
}

export function recordToForm(record: RecordDataType): FormValueType {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      key === "registeredAt" ? dayjs(value as string) : value
    ])
  ) as FormValueType;
}