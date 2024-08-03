import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import type { Task } from "@/types/task";

const ENDPOINT = "/tasks";

type TaskParams = Omit<Task, "id">;

interface UseTasksReturns {
  tasks: Task[];
  error: Error | null;
  isLoading: boolean;
  api: {
    create: {
      createTask: (params: TaskParams) => void;
      isMutating: boolean;
    };
  };
}

export function useTasks(): UseTasksReturns {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  const { data, error, isLoading } = useGet<GetTasksResponseBody>(ENDPOINT);
  const tasks = data?.tasks ?? [];

  const { trigger: createTask, isMutating } = usePost(ENDPOINT);

  return {
    tasks,
    error,
    isLoading,
    api: { create: { createTask, isMutating } },
  };
}
