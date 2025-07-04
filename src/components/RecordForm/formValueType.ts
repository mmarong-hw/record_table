import type { Dayjs } from "dayjs";
import type { Label } from "../../field/baseFields";

export type FormValueType = Record<Label, string | boolean | Dayjs>;
