import { createContext } from "react";
import type { RecordDataType } from "../../hook/useRecord";

export const StorageRecordContext = createContext<RecordDataType[]>([]);

interface Props {
  children: React.ReactNode;
  data: RecordDataType[];
}

export function StorageRecordProvider({ children, data }: Props) {
  return (
    <StorageRecordContext.Provider value={data}>
      {children}
    </StorageRecordContext.Provider>
  );
}
