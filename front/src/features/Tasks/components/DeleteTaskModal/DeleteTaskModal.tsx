import {
  Alert,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";

import type { Task } from "@/types/task";
import { useDeleteTask } from "../../hooks/useTasks";
import type { TaskParams } from "../../types/taskParams";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
  task: Task | null;
}

export function DeleteTaskModal(props: DeleteTaskModalProps): JSX.Element {
  const { isOpen, onClose, onSuccess, task } = props;

  const theme = useTheme();

  const { deleteTask, isDeleting, deleteTaskError } = useDeleteTask();
  const canSubmit = !isDeleting;

  async function onDelete() {
    if (!task) {
      throw new Error("Task is not found");
    }

    await deleteTask(task.id);
    onSuccess({ title: task.title });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>タスク削除</DialogTitle>
      <DialogContent dividers sx={{ paddingY: theme.spacing(5) }}>
        {deleteTaskError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {deleteTaskError.message}
          </Alert>
        )}
        <DialogContentText>{task?.title}を削除しますか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup>
          <Button type="button" color="cancel" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            type="submit"
            color="error"
            variant="contained"
            disableElevation
            disabled={!canSubmit}
            onClick={onDelete}
          >
            削除
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
