import type { UseFormRegister } from "react-hook-form";

import type { TaskParams } from "../../types/taskParams";

interface CreateTaskFormContentProps {
  register: UseFormRegister<TaskParams>;
}

export function CreateTaskFormContent(
  props: CreateTaskFormContentProps,
): React.JSX.Element {
  const { register } = props;

  return (
    <>
      <label>
        Title
        <input {...register("title")} />
      </label>
    </>
  );
}
