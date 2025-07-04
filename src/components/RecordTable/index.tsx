import { Table } from "antd";
import { useRecordTable } from "./hook/useRecordTable";
import { CreateOrEditRecordModal } from "../Modal/CreateOrEditRecordModal";
import { useEffect, useRef, useState } from "react";
import type { FormValueType } from "../RecordForm/formValueType";
import { recordToForm } from "../../hook/useRecord";
import { useRecordContext } from "../Provider/RecordProvider";

export function RecordTable() {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<FormValueType>();
  const editRecordIndex = useRef<number>(null);
  const { columns, tableData } = useRecordTable({
    onEdit: (record) => {
      setOpen(true);
      setInitialValues(recordToForm(record));
      editRecordIndex.current = Number(record.key);
    },
  });
  const { updateRecord } = useRecordContext();

  useEffect(() => {
    if (!open) {
      editRecordIndex.current = null;
      setInitialValues(undefined);
    }
  }, [open]);

  const handleClose = () => {
    setInitialValues(undefined);
    setOpen(false);
  }

  const handleSubmit = (values: FormValueType) => {
    if (editRecordIndex.current !== null) {
      updateRecord(editRecordIndex.current, values);
    }
    setOpen(false);
  }

  return (
    <>
      <Table
        className="custom-table"
        rowSelection={{}}
        columns={columns.map(column => ({
          ...column,
          className: 'custom-table-cell',
        }))}
        dataSource={tableData}
        pagination={false}
      />
      <CreateOrEditRecordModal
        open={open}
        initialValues={initialValues}
        type="edit"
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}