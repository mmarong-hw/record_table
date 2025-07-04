import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useRecords } from "../../hook/useRecord";
import type { RecordDataType } from "../../hook/useRecord";
import type { FormValueType } from "../RecordForm/formValueType";

interface RecordContextType {
  records: RecordDataType[];
  addRecord: (form: FormValueType) => void;
  removeRecord: (index: number) => void;
  updateRecord: (index: number, form: FormValueType) => void;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const { records, addRecord, removeRecord, updateRecord } = useRecords();

  return (
    <RecordContext.Provider
      value={{ records, addRecord, removeRecord, updateRecord }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export function useRecordContext() {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error("RecordProvider 가 상위에 정의되어 있는지 확인하세요.");
  }
  return context;
}
