import { useGet } from "@/hooks/useGet";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseTasksReturns {
  tasks: Task[];
  error: Error | null;
  isLoading: boolean;
}

export function useTasks(): UseTasksReturns {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  const { data, error, isLoading } = useGet<GetTasksResponseBody>(ENDPOINT);
  const tasks = data?.tasks ?? [];

  return {
    tasks,
    error,
    isLoading,
  };
}
