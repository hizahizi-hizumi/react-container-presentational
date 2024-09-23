import type { TaskParams } from "@/features/Tasks/types/taskParams";
import { usePost } from "@/hooks/req";
// import { usePost } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseCreateTaskReturns {
  createTask: (params: TaskParams) => Promise<void>;
  isCreating: boolean;
  createdTask: Task | undefined;
  createTaskError: Error | undefined;
}

export function useCreateTask(): UseCreateTaskReturns {
  const {
    post: postTask,
    isLoading: isCreating,
    // isMutating: isCreating,
    data: createdTask,
    error: createTaskError,
  } = usePost<TaskParams, Task>(ENDPOINT);

  async function createTask(params: TaskParams) {
    await postTask(params);
    // await postTask({ params });
  }

  return { createTask, isCreating, createdTask, createTaskError };
}
