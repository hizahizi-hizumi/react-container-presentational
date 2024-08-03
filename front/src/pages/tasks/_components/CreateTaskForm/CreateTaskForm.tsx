import { useForm } from "react-hook-form";

import type { TaskParams } from "@/pages/tasks/types/taskParams";

interface CreateTaskFormProps {
  formId: string;
  onSubmit: (data: TaskParams) => void;
}

export function CreateTaskForm(props: CreateTaskFormProps): React.JSX.Element {
  const { formId, onSubmit } = props;

  const { register, handleSubmit } = useForm<TaskParams>();

  return (
    <>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
      </form>
    </>
  );
}
