import { useContext, useEffect, useState } from "react";
import type { FormValueType } from "../components/RecordForm/formValueType";
import dayjs, { isDayjs } from "dayjs";
import type { Label } from "../field/baseFields";
import { StorageRecordContext } from "../components/Provider/StorageRecordProvider";
import { storage } from "../localStorage/localStorage";

export type RecordDataType = Record<Label, string | boolean>;

export function useRecords() {
  const defaultRecords = useContext(StorageRecordContext);
  const [records, setRecords] = useState<RecordDataType[]>(defaultRecords);

  useEffect(() => {
    if (STORAGE === "storage") {
      storage.set(records);
    }
  }, [records]);

  const addRecord = (form: FormValueType) => {
    setRecords(prev => [...prev, formToRecord(form)]);
  };

  const removeRecord = (index: number) => {
    setRecords(prev => prev.filter((_, i) => i !== index));
  };

  const updateRecord = (index: number, form: FormValueType) => {
    setRecords(prev =>
      prev.map((record, i) => (i === index ? formToRecord(form) : record)),
    );
  };

  return { records, addRecord, removeRecord, updateRecord };
}

function formToRecord(form: FormValueType): RecordDataType {
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => [
      key,
      isDayjs(value) ? value.format("YYYY-MM-DD") : value,
    ]),
  ) as RecordDataType;
}

export function recordToForm(record: RecordDataType): FormValueType {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      key === "registeredAt" ? dayjs(value as string) : value,
    ]),
  ) as FormValueType;
}
