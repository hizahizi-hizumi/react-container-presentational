import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { usePut } from "@/hooks/usePut";
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
      isCreating: boolean;
      createdTask: Task | undefined;
      createError: Error | undefined;
    };
    update: {
      updateTask: (id: number | undefined, params: TaskParams) => Promise<void>;
      isUpdating: boolean;
      updatedTask: Task | undefined;
      updateError: Error | undefined;
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

  async function updateTask(id: number | undefined, params: TaskParams) {
    if (id !== undefined) {
      await updateTaskTrigger({ id, params });
    } else {
      throw new Error("ID is undefined");
    }
  }

  return {
    tasks,
    error,
    isLoading,
    api: {
      create: { createTask, isCreating, createdTask, createError },
      update: { updateTask, isUpdating, updatedTask, updateError },
    },
  };
}
