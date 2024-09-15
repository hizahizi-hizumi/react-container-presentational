import { TextField } from "@mui/material";
import type { UseFormRegister } from "react-hook-form";

import type { Task } from "@/types/task";
import type { TaskParams } from "../../types/taskParams";

interface UpdateTaskFormContentProps {
  task: Task | null;
  register: UseFormRegister<TaskParams>;
}

export function UpdateTaskFormContent(
  props: UpdateTaskFormContentProps,
): JSX.Element {
  const { task, register } = props;

  return (
    <>
      <TextField
        label="Title"
        defaultValue={task?.title}
        variant="standard"
        {...register("title")}
      />
    </>
  );
}
