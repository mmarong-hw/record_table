import type { Field } from "../types/field.ts";

export const labelToKorean = (label: string) => {
  switch (label) {
    case "name":
      return "이름";
    case "address":
      return "주소";
    case "memo":
      return "메모";
    case "registeredAt":
      return "가입일";
    case "job":
      return "직업";
    case "emailAgreed":
      return "이메일 수신 동의";
    default:
      return label;
  }
}

export const baseFields: Field[] = [
  { type: "text", label: "name", required: true },
  { type: "text", label: "address", required: false },
  { type: "textarea", label: "memo", required: false },
  { type: "date", label: "registeredAt", required: true },
  { type: "select", label: "job", required: false, items: ["개발자", "PO", "디자이너"] },
  { type: "checkbox", label: "emailAgreed", required: false },
];