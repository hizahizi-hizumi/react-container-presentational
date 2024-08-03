import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import type { TaskParams } from "@/pages/tasks/types/taskParams";
import type { Task } from "@/types/task";

const ENDPOINT = "/tasks";

interface UseTasksReturns {
  tasks: Task[];
  error: Error | null;
  isLoading: boolean;
  api: {
    create: {
      createTask: (params: TaskParams) => Promise<void>;
      isMutating: boolean;
      createdTask: Task | null;
      createError: Error | null;
    };
  };
}

export function useTasks(): UseTasksReturns {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  const { data, error, isLoading } = useGet<GetTasksResponseBody>(ENDPOINT);
  const tasks = data?.tasks ?? [];

  const {
    trigger: createTaskTrigger,
    isMutating,
    data: createdTask,
    error: createError,
  } = usePost<Task>(ENDPOINT);

  async function createTask(params: TaskParams) {
    await createTaskTrigger(params);
  }

  return {
    tasks,
    error,
    isLoading,
    api: { create: { createTask, isCreating, createdTask, createError } },
  };
}
