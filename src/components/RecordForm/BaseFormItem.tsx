import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import type { Rule } from "antd/es/form";
import type { ComponentProps } from "react";
import { baseFields, labelToKorean, type LabelUnion } from "../../data/baseFields.ts";
import type { Field } from "../../types/field.ts";

const { TextArea } = Input;

interface Props extends Omit<ComponentProps<typeof Form.Item>, "name" | "label" | "rules"> {
  label: LabelUnion;
}

export function BaseFormItem({ label, ...rest }: Props) {
  const field = baseFields.find((field) => field.label === label);

  if (!field) {
    throw new Error("field 가 없습니다.");
  }

  const props = {
    ...rest,
    label: labelToKorean(label),
    name: label,
    rules: makeRules(field),
    className: "custom-form",
  }

  switch (field?.type) {
    case "text":
      return (
        <Form.Item {...props}>
          <Input />
        </Form.Item>
      );
    case "textarea":
      return (
        <Form.Item {...props}>
          <TextArea rows={3} />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item {...props}>
          <DatePicker />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item {...props}>
          <Select style={{ width: "270px" }}>
            {field?.items?.map((item) => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    case "checkbox":
      return (
        <Form.Item {...props} valuePropName="checked">
          <Checkbox />
        </Form.Item>
      );
  }
}

function makeRules(field: Field) {
  const rules: Rule[] = [];

  if (field.required) {
    rules.push({ required: true, message: "필수 입력 항목입니다." });
  }

  if (field.type === "text") {
    rules.push({ max: 20, message: "글자수 20을 초과할 수 없습니다." });
  }

  if (field.type === "textarea") {
    rules.push({ max: 50, message: "글자수 100을 초과할 수 없습니다." });
  }

  return rules;
}
