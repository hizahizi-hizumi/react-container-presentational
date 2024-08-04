import { useForm } from "react-hook-form";

import type { TaskParams } from "@/pages/tasks/types/taskParams";
import { useTaskAPI } from "../../hooks/useTasks";

interface CreateTaskFormProps {
  formId: string;
  onSuccess: (task: TaskParams) => void;
}

export function CreateTaskForm(props: CreateTaskFormProps): React.JSX.Element {
  const { formId, onSuccess } = props;

  const { register, handleSubmit } = useForm<TaskParams>();

  const { createTask, createError } = useTaskAPI().create;

  async function onSubmit(task: TaskParams) {
    try {
      await createTask(task);
      onSuccess(task);
    } catch (e) {
      throw e;
    }
  }

  return (
    <>
      {createError && <p>{createError.message}</p>}
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
      </form>
    </>
  );
}
