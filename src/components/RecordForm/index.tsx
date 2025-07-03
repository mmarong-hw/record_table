import { Form, type FormInstance } from "antd";
import { baseFields, type FieldValueMap } from "../../data/baseFields";
import { BaseFormItem } from "./BaseFormItem";

interface Props<T> {
  form: FormInstance<T>;
  initialValues?: T;
}

export function RecordForm<T extends FieldValueMap>({ form, initialValues }: Props<T>) {

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      {baseFields.map((field) => (
        <BaseFormItem key={field.label} label={field.label} />
      ))}
    </Form>
  );
}