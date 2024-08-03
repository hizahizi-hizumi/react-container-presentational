import { useGet } from "@/hooks/useGet";
import type { Task } from "@/types/task";

interface UseTasksReturns {
  tasks: Task[];
  error: Error | null;
  isLoading: boolean;
}

export function useTasks(): UseTasksReturns {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  const { data, error, isLoading } = useGet<GetTasksResponseBody>("/tasks");
  const tasks = data?.tasks ?? [];

  return { tasks, error, isLoading };
}
