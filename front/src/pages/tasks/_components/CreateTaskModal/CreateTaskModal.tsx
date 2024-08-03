import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import type { TaskParams } from "../../types/taskParams";
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";

interface CreateTaskModalProps {
  isOpen: boolean;
  canSubmit: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
}

export function CreateTaskModal(
  props: CreateTaskModalProps,
): React.JSX.Element {
  const { isOpen, canSubmit, onClose, onSuccess } = props;

  const formId = "create-task-form";

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>タスク作成</DialogTitle>
      <DialogContent>
        <CreateTaskForm formId={formId} onSuccess={onSuccess} />
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
