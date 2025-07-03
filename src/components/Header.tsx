import { useState } from "react";
import { Button } from "antd";
import { CreateOrEditRecordModal } from "./Modal/CreateOrEditRecordModal";
import { PlusOutlined } from "@ant-design/icons";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <header className="header">
        <h1 className="title">
          회원 목록
        </h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
          추가
        </Button>
      </header>
      <CreateOrEditRecordModal open={open} type="create" onClose={() => {
        setOpen(false);
      }} onSubmit={(values) => {
        console.log(values);
      }} />
    </>
  )
}