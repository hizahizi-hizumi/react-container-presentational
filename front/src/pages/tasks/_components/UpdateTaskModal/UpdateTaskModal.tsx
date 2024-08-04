import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import type { Task } from "@/types/task";
import { useTasks } from "../../hooks/useTasks";
import type { TaskParams } from "../../types/taskParams";
import { UpdateTaskForm } from "../UpdateTaskForm/UpdateTaskForm";

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
  task: Task | null;
}

export function UpdateTaskModal(
  props: UpdateTaskModalProps,
): React.JSX.Element {
  const { isOpen, onClose, onSuccess, task } = props;

  const formId = "update-task-form";

  const { api } = useTasks();
  const { isUpdating } = api.update;
  const canSubmit = !isUpdating;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>タスク作成</DialogTitle>
      <DialogContent>
        <UpdateTaskForm formId={formId} task={task} onSuccess={onSuccess} />
      </DialogContent>
      <DialogActions>
        <button type="button" onClick={onClose}>
          キャンセル
        </button>
        <button type="submit" disabled={!canSubmit} form={formId}>
          作成
        </button>
      </DialogActions>
    </Dialog>
  );
}
