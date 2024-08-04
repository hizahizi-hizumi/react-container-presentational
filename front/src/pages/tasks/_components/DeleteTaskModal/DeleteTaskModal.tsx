import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import type { Task } from "@/types/task";
import { useTasks } from "../../hooks/useTasks";
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

  const { api } = useTasks();
  const { deleteTask, isDeleting, deleteError } = api.delete;
  const canSubmit = !isDeleting;

  async function onDelete() {
    if (!task) {
      return;
    }

    try {
      await deleteTask(task.id);
      onSuccess({ title: task.title });
    } catch (e) {
      // onSuccess が呼ばれないように必要
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>タスク作成</DialogTitle>
      <DialogContent>
        {deleteError && <p>{deleteError.message}</p>}
        <DialogContentText>
          {task?.title}を削除しますか？
        </DialogContentText>
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
