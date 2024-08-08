import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useCreateTask } from "../../hooks/useTasks";
import type { TaskParams } from "../../types/taskParams";
import { CreateTaskFormContent } from "../CreateTaskFormContent/CreateTaskFormContent";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (params: TaskParams) => void;
}

export function CreateTaskModal(
  props: CreateTaskModalProps,
): React.JSX.Element {
  const { isOpen, onClose, onSuccess } = props;

  const { createTask, createError } = useCreateTask();

  const { handleSubmit, register } = useForm<TaskParams>();

  async function onSubmit(task: TaskParams) {
    try {
      await createTask(task);
      onSuccess(task);
    } catch (e) {}
  }

  const { isCreating } = useCreateTask();
  const canSubmit = !isCreating;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>タスク作成</DialogTitle>
        <DialogContent>
          {createError && <p>{createError.message}</p>}
          <CreateTaskFormContent register={register} />
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button type="button" color="inherit" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              disabled={!canSubmit}
            >
              作成
            </Button>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
}
