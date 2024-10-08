import {
  Alert,
  Box,
  Button,
  ButtonGroup,
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

export function UpdateTaskModal(props: UpdateTaskModalProps): JSX.Element {
  const { task, isOpen, onClose, onSuccess } = props;

  const { updateTask, isUpdating, updateTaskError } = useUpdateTask();

  const { handleSubmit, register } = useForm<TaskParams>();

  async function onSubmit(taskParams: TaskParams) {
    if (!task) {
      throw new Error("Task is not found");
    }

    try {
      await updateTask(task.id, taskParams);
      onSuccess(taskParams);
    } catch (error) {}
  }

  const canSubmit = !isUpdating;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>タスク更新</DialogTitle>
        <DialogContent dividers sx={{ paddingY: 5 }}>
          {updateTaskError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {updateTaskError.message}
            </Alert>
          )}
          <UpdateTaskFormContent task={task} register={register} />
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button type="button" color="cancel" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              disabled={!canSubmit}
            >
              更新
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
