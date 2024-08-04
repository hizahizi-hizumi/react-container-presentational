import { useDelete } from "@/hooks/useDelete";
import { usePost } from "@/hooks/usePost";
import { usePut } from "@/hooks/usePut";
import type { TaskParams } from "@/pages/tasks/types/taskParams";
import type { Task } from "@/types/task";
import { ENDPOINT } from "./ENDPOINT";

interface UseTaskAPIReturns {
  create: {
    createTask: (params: TaskParams) => Promise<void>;
    isCreating: boolean;
    createdTask: Task | undefined;
    createError: Error | undefined;
  };
  update: {
    updateTask: (id: number, params: TaskParams) => Promise<void>;
    isUpdating: boolean;
    updatedTask: Task | undefined;
    updateError: Error | undefined;
  };
  delete: {
    deleteTask: (id: number) => Promise<void>;
    isDeleting: boolean;
    deletedTask: Task | undefined;
    deleteError: Error | undefined;
  };
}

export function useTaskAPI(): UseTaskAPIReturns {
  const {
    trigger: createTaskTrigger,
    isMutating: isCreating,
    data: createdTask,
    error: createError,
  } = usePost<TaskParams, Task>(ENDPOINT);

  async function createTask(params: TaskParams) {
    await createTaskTrigger({ params });
  }

  const {
    trigger: updateTaskTrigger,
    isMutating: isUpdating,
    data: updatedTask,
    error: updateError,
  } = usePut<TaskParams, Task>(ENDPOINT);

  async function updateTask(id: number, params: TaskParams) {
    await updateTaskTrigger({ id, params });
  }

  const {
    trigger: deleteTaskTrigger,
    isMutating: isDeleting,
    data: deletedTask,
    error: deleteError,
  } = useDelete<Task>(ENDPOINT);

  async function deleteTask(id: number) {
    await deleteTaskTrigger({ id });
  }

  return {
    create: { createTask, isCreating, createdTask, createError },
    update: { updateTask, isUpdating, updatedTask, updateError },
    delete: { deleteTask, isDeleting, deletedTask, deleteError },
  };
}
