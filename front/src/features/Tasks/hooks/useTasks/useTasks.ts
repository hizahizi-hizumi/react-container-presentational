import { useGet } from "@/hooks/req";
// import { useGet } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseTasksReturns {
  tasks: Task[];
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
}

export function useTasks(): UseTasksReturns {
  const { data, error, isLoading, isValidating } = useGet<Task[]>(ENDPOINT);
  const tasks = data ?? [];

  return {
    tasks,
    error,
    isLoading,
    isValidating,
  };
}
