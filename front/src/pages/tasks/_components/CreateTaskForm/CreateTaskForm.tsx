import { useForm } from "react-hook-form";

import { useTasks } from "@/pages/tasks/hooks/useTasks";
import type { TaskParams } from "@/pages/tasks/types/taskParams";

interface CreateTaskFormProps {
  formId: string;
  onSuccess: (task: TaskParams) => void;
}

export function CreateTaskForm(props: CreateTaskFormProps): React.JSX.Element {
  const { formId, onSuccess } = props;

  const { register, handleSubmit } = useForm<TaskParams>();

  const { api } = useTasks();
  const { createTask, createError } = api.create;

  async function onSubmit(task: TaskParams) {
    try {
      await createTask(task);
      onSuccess(task);
    } catch (e) {
      // onSuccess が呼ばれないように必要
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
