import { Table, Checkbox, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { DropdownItem } from "./DropdownItem";
import type { ColumnType } from "antd/es/table";
import { useRecordTable, type TableData } from "./hook/useRecordTable";
import { DropdownContainer } from "./DropdownContainer";
import { Divider } from "../Divider";

const columns: ColumnType<TableData>[] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    filters: [
      { text: "John Doe", value: "John Doe" },
      { text: "Foo Bar", value: "Foo Bar" },
    ],
    onFilter: (value, record) => {
      if (typeof value === "string") {
        return record.name.includes(value);
      }
      return false;
    },
  },
  {
    title: "주소",
    dataIndex: "address",
    key: "address",
    filters: [
      { text: "강남구", value: "강남구" },
      { text: "서초구", value: "서초구" },
    ],
  },
  {
    title: "메모",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "가입일",
    dataIndex: "registeredAt",
    key: "registeredAt",
  },
  {
    title: "직업",
    dataIndex: "job",
    key: "job",
  },
  {
    title: "이메일 수신 동의",
    dataIndex: "emailAgreed",
    key: "emailAgreed",
    render: (value: boolean) => <Checkbox checked={value} disabled />,
  },
  {
    key: "action",
    render: (_text: string, record: any) => {
      // const items = [
      //   {
      //     key: "edit",
      //     label: <DropdownItem>수정</DropdownItem>,
      //     onClick: () => {
      //       console.log("Edit clicked for:", record);
      //     },
      //   },
      //   {
      //     key: "delete",
      //     label: <DropdownItem textColor="red">삭제</DropdownItem>,
      //     onClick: () => {
      //       console.log("Delete clicked for:", record);
      //     },
      //   },
      // ];

      return (
        <Dropdown
          overlay={
            <DropdownContainer>
              <DropdownItem>수정</DropdownItem>
              <Divider/>
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
      columns={columns.map(column => ({
        ...column,
        className: 'custom-table-cell',
      }))}
      dataSource={tableData}
      pagination={false}
    />
  );
}