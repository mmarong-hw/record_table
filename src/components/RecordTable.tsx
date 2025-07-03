import { Table, Checkbox, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { DropdownItem } from "./DropdownItem";

const columns = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    filters: [
      { text: "John Doe", value: "John Doe" },
      { text: "Foo Bar", value: "Foo Bar" },
    ],
    onFilter: (value: string, record: any) => record.name.includes(value),
  },
  {
    title: "주소",
    dataIndex: "address",
    key: "address",
    filters: [
      { text: "강남구", value: "강남구" },
      { text: "서초구", value: "서초구" },
    ],
    onFilter: (value: string, record: any) => record.address.includes(value),
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
    render: (_text, record) => {
      const items = [
        {
          key: "edit",
          label: <DropdownItem>수정</DropdownItem>,
          onClick: () => {
            console.log("Edit clicked for:", record);
          },
        },
        {
          key: "delete",
          label: <DropdownItem textColor="red">삭제</DropdownItem>,
          onClick: () => {
            console.log("Delete clicked for:", record);
          },
        },
      ];

      return (
        <Dropdown
          menu={{
            items: items.map(({ onClick, ...rest }) => ({
              ...rest,
              onClick: () => onClick(record), // ✅ record 넘겨주기
            })),
          }}
          overlayClassName="custom-dropdown"
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      );
    },
  },
];

const data = [
  {
    key: "1",
    name: "John Doe",
    address: "서울 강남구",
    note: "외국인",
    registeredAt: "2024-10-02",
    job: "개발자",
    emailAgreed: true,
  },
  {
    key: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    note: "한국인",
    registeredAt: "2024-10-01",
    job: "PO",
    emailAgreed: false,
  },
];

export function RecordTable() {
  return (
    <Table
      className="custom-table"
      rowSelection={{}}
      columns={columns.map(column => ({
        ...column,
        className: 'custom-table-cell',
      }))}
      dataSource={data}
      pagination={false}
    />
  );
}