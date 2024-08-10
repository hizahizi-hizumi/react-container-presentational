import { TextField } from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { TaskParams } from "../../types/taskParams";

interface CreateTaskFormContentProps {
  register: UseFormRegister<TaskParams>;
  errors: FieldErrors<TaskParams>;
}

export function CreateTaskFormContent(
  props: CreateTaskFormContentProps,
): React.JSX.Element {
  const { register, errors } = props;

  const titleValidation = {
    required: { value: true, message: "必須です" },
    maxLength: {
      value: 255,
      message: "255文字以内で入力してください",
    },
  };

  return (
    <>
      <TextField
        label="タイトル"
        variant="standard"
        {...register("title", titleValidation)}
        error={Boolean(errors?.title)}
        helperText={errors?.title?.message}
      />
    </>
  );
}
