import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";

import type { Task } from "@/types/task";
import { useUpdateTask } from "../../hooks/useTasks";
import type { TaskParams } from "../../types/taskParams";
import { UpdateTaskFormContent } from "../UpdateTaskFormContent/UpdateTaskFormContent";

interface UpdateTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
}

export function UpdateTaskModal(
  props: UpdateTaskModalProps,
): React.JSX.Element {
  const { task, isOpen, onClose, onSuccess } = props;

  const { updateTask, updateError } = useUpdateTask();

  const { handleSubmit, register } = useForm<TaskParams>();

  async function onSubmit(taskParams: TaskParams) {
    if (!task) {
      throw new Error("Task is not found");
    }
    try {
      await updateTask(task.id, taskParams);
      onSuccess(taskParams);
    } catch (e) {}
  }

  const { isUpdating } = useUpdateTask();
  const canSubmit = !isUpdating;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>タスク更新</DialogTitle>
        <DialogContent>
          {updateError && <p>{updateError.message}</p>}
          <UpdateTaskFormContent task={task} register={register} />
        </DialogContent>
        <DialogActions>
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" disabled={!canSubmit}>
            更新
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
