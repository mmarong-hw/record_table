import type { CheckboxField, DateField, SelectField, TextField, TextareaField } from "./types.ts";
interface NameField extends TextField {
  type: "text";
  label: "name";
  required: true;
}

interface AddressField extends TextField {
  type: "text";
  label: "address";
  required: false;
}

interface MemoField extends TextareaField {
  type: "textarea";
  label: "memo";
  required: false;
}

interface RegisteredAtField extends DateField {
  type: "date";
  label: "registeredAt";
  required: true;
}

interface JobField extends SelectField {
  type: "select";
  label: "job";
  required: false;
  items: ["개발자", "PO", "디자이너"];
}

interface EmailAgreedField extends CheckboxField {
  type: "checkbox";
  label: "emailAgreed";
  required: false;
}

export const labelToKorean = (label: Label) => {
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

type BaseFields = [
  NameField,
  AddressField,
  MemoField,
  RegisteredAtField,
  JobField,
  EmailAgreedField,
];

export const baseFields: BaseFields = [
  { type: "text", label: "name", required: true },
  { type: "text", label: "address", required: false },
  { type: "textarea", label: "memo", required: false },
  { type: "date", label: "registeredAt", required: true },
  { type: "select", label: "job", required: false, items: ["개발자", "PO", "디자이너"] },
  { type: "checkbox", label: "emailAgreed", required: false },
];

export type Label = BaseFields[number]["label"];