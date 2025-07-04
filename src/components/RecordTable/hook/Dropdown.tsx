import { Dropdown as AntDropdown, type DropdownProps as AntDropdownProps } from "antd";
import { DropdownContainer } from "../DropdownContainer";
import { DropdownItem } from "../DropdownItem";
import { Divider } from "../../Divider";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props extends Omit<AntDropdownProps, 'overlay' | "children" | "open" | "onOpenChange" | "trigger"> {
  onEdit: () => void;
  onDelete: () => void;
}

export function Dropdown({
  onEdit,
  onDelete,
  ...dropdownProps
}: Props) {
  const [visible, setVisible] = useState(false);

  const handleEdit = () => {
    onEdit();
    setVisible(false);
  }

  const handleDelete = () => {
    onDelete();
    setVisible(false);
  }

  return (
    <AntDropdown
      open={visible}
      onOpenChange={setVisible}
      overlay={
        <DropdownContainer>
          <DropdownItem onClick={handleEdit}>수정</DropdownItem>
          <Divider />
          <DropdownItem onClick={handleDelete} textColor="red">삭제</DropdownItem>
        </DropdownContainer>
      }
      trigger={["click"]}
      {...dropdownProps}
    >
      <MoreOutlined />
    </AntDropdown>
  )
}