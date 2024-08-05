import { useForm } from "react-hook-form";

import type { TaskParams } from "@/pages/tasks/types/taskParams";
import type { Task } from "@/types/task";
import { useUpdateTask } from "../../hooks/useTasks";

interface UpdateTaskFormProps {
  formId: string;
  onSuccess: (task: TaskParams) => void;
  task: Task | null;
}

export function UpdateTaskForm(props: UpdateTaskFormProps): React.JSX.Element {
  const { formId, onSuccess, task } = props;

  const { register, handleSubmit } = useForm<TaskParams>();

  const { updateTask, updateError } = useUpdateTask();

  async function onSubmit(taskParams: TaskParams) {
    if (!task) {
      throw new Error("Task is not found");
    }

    try {
      await updateTask(task.id, taskParams);
      onSuccess(taskParams);
    } catch (e) {}
  }

  return (
    <>
      {updateError && <p>{updateError.message}</p>}
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input defaultValue={task?.title} {...register("title")} />
      </form>
    </>
  );
}
