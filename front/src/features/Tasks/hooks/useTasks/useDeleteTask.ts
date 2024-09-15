import { useDelete } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseDeleteTaskReturns {
  deleteTask: (id: number) => Promise<void>;
  isDeleting: boolean;
  deletedTask: Task | undefined;
  deleteError: Error | undefined;
}

export function useDeleteTask(): UseDeleteTaskReturns {
  const {
    trigger: deleteTaskTrigger,
    isMutating: isDeleting,
    data: deletedTask,
    error: deleteError,
  } = useDelete<Task>(ENDPOINT);

  async function deleteTask(id: number) {
    await deleteTaskTrigger({ id });
  }

  return { deleteTask, isDeleting, deletedTask, deleteError };
}
