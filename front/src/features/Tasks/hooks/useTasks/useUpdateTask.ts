import type { TaskParams } from "@/features/Tasks/types/taskParams";
import { usePut } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseUpdateTaskReturns {
  updateTask: (id: number, params: TaskParams) => Promise<void>;
  isUpdating: boolean;
  updatedTask: Task | undefined;
  updateError: Error | undefined;
}

export function useUpdateTask(): UseUpdateTaskReturns {
  const {
    put: putTask,
    isMutating: isUpdating,
    data: updatedTask,
    error: updateError,
  } = usePut<TaskParams, Task>(ENDPOINT);

  async function updateTask(id: number, params: TaskParams) {
    await putTask({ id, params });
  }

  return { updateTask, isUpdating, updatedTask, updateError };
}
