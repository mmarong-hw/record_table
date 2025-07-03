import { Form, type FormInstance } from "antd";
import { baseFields } from "../../data/baseFields";
import { BaseFormItem } from "./BaseFormItem";
import type { FormValueType } from "./formValueType";
import { memo } from "react";

interface Props<T> {
  form: FormInstance<T>;
  initialValues?: T;
}

function RecordFormOrig<T extends FormValueType>({ form, initialValues }: Props<T>) {

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      {baseFields.map((field) => (
        <BaseFormItem key={field.label} label={field.label} />
      ))}
    </Form>
  );
}

export const RecordForm = memo(RecordFormOrig);