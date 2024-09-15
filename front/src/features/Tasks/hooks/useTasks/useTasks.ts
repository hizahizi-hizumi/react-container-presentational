import { useGet } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseTasksReturns {
  tasks: Task[];
  error: Error | undefined;
  isLoading: boolean;
}

export function useTasks(): UseTasksReturns {
  const { data, error, isLoading } = useGet<Task[]>(ENDPOINT);
  const tasks = data ?? [];

  return {
    tasks,
    error,
    isLoading,
  };
}
