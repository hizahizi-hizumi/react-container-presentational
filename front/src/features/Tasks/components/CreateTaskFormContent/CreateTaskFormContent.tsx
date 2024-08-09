import type { UseFormRegister } from "react-hook-form";

import type { TaskParams } from "../../types/taskParams";
import { TextField } from "@mui/material";

interface CreateTaskFormContentProps {
  register: UseFormRegister<TaskParams>;
}

export function CreateTaskFormContent(
  props: CreateTaskFormContentProps,
): React.JSX.Element {
  const { register } = props;

  return (
    <>
      <TextField
        label="Title"
        variant="standard"
        {...register("title")}
      />
    </>
  );
}
