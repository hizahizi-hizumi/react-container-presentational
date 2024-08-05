import { usePost } from "@/hooks/usePost";
import type { TaskParams } from "@/pages/tasks/types/taskParams";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseCreateTaskReturns {
  createTask: (params: TaskParams) => Promise<void>;
  isCreating: boolean;
  createdTask: Task | undefined;
  createError: Error | undefined;
}

export function useCreateTask(): UseCreateTaskReturns {
  const {
    trigger: createTaskTrigger,
    isMutating: isCreating,
    data: createdTask,
    error: createError,
  } = usePost<TaskParams, Task>(ENDPOINT);

  async function createTask(params: TaskParams) {
    await createTaskTrigger({ params });
  }

  return { createTask, isCreating, createdTask, createError };
}
