import { Typography } from "@mui/material";

import { useSnackbar } from "@/hooks/components/useSnackbar";
import { CreateTaskButton } from "./components/CreateTaskButton/CreateTaskButton";
import { CreateTaskModal } from "./components/CreateTaskModal/CreateTaskModal";
import { DeleteTaskModal } from "./components/DeleteTaskModal/DeleteTaskModal";
import { SuccessSnackbar } from "./components/SuccessSnackbar/SuccessSnackbar";
import { TaskList } from "./components/TaskList/TaskList";
import { UpdateTaskModal } from "./components/UpdateTaskModal/UpdateTaskModal";
import { useTaskModals } from "./hooks/useTaskModals";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export function Tasks(): JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  const {
    create,
    update,
    delete: delete_,
    selectedTask,
    handleEditButtonClick,
    handleDeleteButtonClick,
  } = useTaskModals();

  const {
    isOpen: isOpenSnackbar,
    open: openSnackbar,
    close: closeSnackbar,
    message,
  } = useSnackbar();

  function onCreateSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を作成しました`);
    create.close();
  }

  function onUpdateSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を更新しました`);
    update.close();
  }

  function onDeleteSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を削除しました`);
    delete_.close();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>failed to Load</p>;
  }

  return (
    <>
      <Typography variant="h4">Tasks</Typography>
      <CreateTaskButton onClick={create.open} />

      <TaskList
        tasks={tasks}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />

      <SuccessSnackbar
        isOpen={isOpenSnackbar}
        onClose={closeSnackbar}
        message={message}
      />

      <CreateTaskModal
        isOpen={create.isOpen}
        onClose={create.close}
        onSuccess={onCreateSuccess}
      />

      <UpdateTaskModal
        isOpen={update.isOpen}
        onClose={update.close}
        onSuccess={onUpdateSuccess}
        task={selectedTask}
      />

      <DeleteTaskModal
        isOpen={delete_.isOpen}
        onClose={delete_.close}
        onSuccess={onDeleteSuccess}
        task={selectedTask}
      />
    </>
  );
}
