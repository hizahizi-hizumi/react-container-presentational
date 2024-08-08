import type { UseFormRegister } from "react-hook-form";

import type { Task } from "@/types/task";
import type { TaskParams } from "../../types/taskParams";

interface UpdateTaskFormContentProps {
  task: Task | null;
  register: UseFormRegister<TaskParams>;
}

export function UpdateTaskFormContent(
  props: UpdateTaskFormContentProps,
): React.JSX.Element {
  const { task, register } = props;

  return (
    <>
      <label>
        Title
        <input defaultValue={task?.title} {...register("title")} />
      </label>
    </>
  );
}
