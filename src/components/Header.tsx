import { useState } from "react";
import { Button } from "antd";
import {
  CreateOrEditRecordModal,
  type Props as CreateOrEditRecordModalProps,
} from "./Modal/CreateOrEditRecordModal";
import { PlusOutlined } from "@ant-design/icons";
import { useRecordContext } from "./Provider/RecordProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { addRecord } = useRecordContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit: CreateOrEditRecordModalProps["onSubmit"] = values => {
    addRecord(values);
    setOpen(false);
  };

  return (
    <>
      <header className="header">
        <h1 className="title">회원 목록</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
          추가
        </Button>
      </header>
      <CreateOrEditRecordModal
        open={open}
        type="create"
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
