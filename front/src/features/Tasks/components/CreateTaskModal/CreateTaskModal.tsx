import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
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

export function CreateTaskModal(props: CreateTaskModalProps): JSX.Element {
  const { isOpen, onClose, onSuccess } = props;
  const theme = useTheme();

  const { createTask, isCreating, createTaskError } = useCreateTask();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskParams>();

  async function onSubmit(task: TaskParams) {
    await createTask(task);
    onSuccess(task);
    reset();
  }

  const canSubmit = !isCreating && isValid;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>タスク作成</DialogTitle>
        <DialogContent dividers sx={{ paddingY: theme.spacing(5) }}>
          {createTaskError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {createTaskError.message}
            </Alert>
          )}
          <CreateTaskFormContent register={register} errors={errors} />
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
              作成
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
