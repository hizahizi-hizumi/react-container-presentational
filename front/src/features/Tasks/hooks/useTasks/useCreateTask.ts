import type { TaskParams } from "@/features/Tasks/types/taskParams";
import { usePost } from "@/hooks/request";
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
    post: postTask,
    isMutating: isCreating,
    data: createdTask,
    error: createError,
  } = usePost<TaskParams, Task>(ENDPOINT);

  async function createTask(params: TaskParams) {
    await postTask({ params });
  }

  return { createTask, isCreating, createdTask, createError };
}
