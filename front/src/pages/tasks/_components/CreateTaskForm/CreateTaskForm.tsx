import { useForm } from "react-hook-form";

import type { Task } from "@/types/task";

type TaskInputs = Omit<Task, "id">;

interface CreateTaskFormProps {
  canSubmit: boolean;
  onSubmit: (data: TaskInputs) => void;
}

export function CreateTaskForm(props: CreateTaskFormProps): React.JSX.Element {
  const { canSubmit, onSubmit } = props;

  const { register, handleSubmit } = useForm<TaskInputs>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        <button type="submit" disabled={!canSubmit}>
          作成
        </button>
      </form>
    </>
  );
}
