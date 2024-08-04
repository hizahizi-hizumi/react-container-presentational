import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import type { Task } from "@/types/task";
import { useTaskAPI } from "../../hooks/useTasks";
import type { TaskParams } from "../../types/taskParams";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
  task: Task | null;
}

export function DeleteTaskModal(
  props: DeleteTaskModalProps,
): React.JSX.Element {
  const { isOpen, onClose, onSuccess, task } = props;

  const { deleteTask, isDeleting, deleteError } = useTaskAPI().delete;
  const canSubmit = !isDeleting;

  async function onDelete() {
    if (!task) {
      throw new Error("Task is not found");
    }

    try {
      await deleteTask(task.id);
      onSuccess({ title: task.title });
    } catch (e) {}
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>タスク作成</DialogTitle>
      <DialogContent>
        {deleteError && <p>{deleteError.message}</p>}
        <DialogContentText>{task?.title}を削除しますか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <button type="button" onClick={onClose}>
          キャンセル
        </button>
        <button type="submit" disabled={!canSubmit} onClick={onDelete}>
          削除
        </button>
      </DialogActions>
    </Dialog>
  );
}
