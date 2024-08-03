import { useForm } from "react-hook-form";

import type { TaskParams } from "@/pages/tasks/types/taskParams";

interface CreateTaskFormProps {
  canSubmit: boolean;
  onSubmit: (data: TaskParams) => void;
}

export function CreateTaskForm(props: CreateTaskFormProps): React.JSX.Element {
  const { canSubmit, onSubmit } = props;

  const { register, handleSubmit } = useForm<TaskParams>();

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
