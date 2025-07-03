interface CommonField {
  label: string;
  required: boolean;
}

export interface TextField extends CommonField {
  type: "text";
}

export interface TextareaField extends CommonField {
  type: "textarea";
}

export interface DateField extends CommonField {
  type: "date";
}

export interface SelectField extends CommonField {
  type: "select";
  items: string[];
}

export interface CheckboxField extends CommonField {
  type: "checkbox";
}

export type Field = TextField |
  TextareaField |
  DateField |
  SelectField |
  CheckboxField;

  export type FieldWithLabel = Field & {
    label: string;
  }
