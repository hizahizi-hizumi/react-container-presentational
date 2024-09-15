import { useDelete } from "@/hooks/request";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseDeleteTaskReturns {
  deleteTask: (id: number) => Promise<void>;
  isDeleting: boolean;
  deletedTask: Task | undefined;
  deleteTaskError: Error | undefined;
}

export function useDeleteTask(): UseDeleteTaskReturns {
  const {
    delete: deleteTask_,
    isMutating: isDeleting,
    data: deletedTask,
    error: deleteTaskError,
  } = useDelete<Task>(ENDPOINT);

  async function deleteTask(id: number) {
    await deleteTask_({ id });
  }

  return { deleteTask, isDeleting, deletedTask, deleteTaskError };
}
