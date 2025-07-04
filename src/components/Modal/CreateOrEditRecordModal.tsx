import { Modal, Form } from "antd";
import { RecordForm } from "../RecordForm";
import { baseFields } from "../../field/baseFields";
import { useMemo } from "react";
import type { FormValueType } from "../RecordForm/formValueType";
import type { Dayjs } from "dayjs";

export interface Props {
  initialValues?: FormValueType;
  open: boolean;
  type: "create" | "edit";
  onClose: () => void;
  onSubmit?: (values: FormValueType) => void;
}

export function CreateOrEditRecordModal({ initialValues, open, onClose, onSubmit }: Props) {
  const [form] = Form.useForm<FormValueType>();
  const formValues = Form.useWatch([], form);

  const disabled = useMemo(() => {
    if (formValues) {
      const requiredFieldValues = baseFields
        .filter(field => field.required)
        .map(field => formValues[field.label]);
      const hasEmptyRequired = requiredFieldValues.filter(v => v === undefined).length > 0;
      return form.getFieldsError().some((field) => field.errors.length > 0) || hasEmptyRequired;
    }

    return true; 
  }, [formValues]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const registeredAt = (values.registeredAt as Dayjs).format("YYYY-MM-DD");
    onSubmit?.({ ...values, registeredAt });
    form.resetFields();
  };

  return (
    <Modal
      className="custom-modal"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      okText="추가"
      cancelText="취소"
      title="회원 추가"
      okButtonProps={{
        disabled,
      }}
    >
      <RecordForm form={form} initialValues={initialValues} />
    </Modal>
  );
}