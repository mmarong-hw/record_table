import { Modal, Form } from "antd";
import { RecordForm } from "../RecordForm";
import { baseFields, type FieldValueMap } from "../../data/baseFields";
import { useMemo } from "react";

interface Props {
  initialValues: FieldValueMap;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

export function EditRecordModal({ initialValues, open, onClose, onSubmit }: Props) {
  const [form] = Form.useForm<FieldValueMap>();
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
    onSubmit(values);
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
      okText="수정"
      cancelText="취소"
      title="회원 수정"
      okButtonProps={{
        disabled,
      }}
    >
      <RecordForm form={form} initialValues={initialValues} />
    </Modal>
  );
}