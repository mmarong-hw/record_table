import { Table, Checkbox, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { DropdownItem } from "./DropdownItem";
import type { ColumnType } from "antd/es/table";
import { useRecordTable, type TableData } from "./hook/useRecordTable";
import { DropdownContainer } from "./DropdownContainer";
import { Divider } from "../Divider";

const columns: ColumnType<TableData>[] = [
  {
    key: "action",
    render: (_text: string, record: any) => {
      return (
        <Dropdown
          overlay={
            <DropdownContainer>
              <DropdownItem>수정</DropdownItem>
              <Divider />
              <DropdownItem textColor="red">삭제</DropdownItem>
            </DropdownContainer>
          }
          // menu={{
          //   items,
          // }}
          // overlayClassName="custom-dropdown"
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      );
    },
  },
];

export function RecordTable() {
  const { columns: columnss, tableData } = useRecordTable();
  return (
    <Table
      className="custom-table"
      rowSelection={{}}
      columns={columnss.map(column => ({
        ...column,
        className: 'custom-table-cell',
      }))}
      dataSource={tableData}
      pagination={false}
    />
  );
}