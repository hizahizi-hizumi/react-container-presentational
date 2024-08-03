import { useState } from "react";
import type React from "react";

import { Alert, Snackbar } from "@mui/material";

import { CreateTaskModal } from "./_components/CreateTaskModal/CreateTaskModal";
import { TaskList } from "./_components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTask, setCreatedTask] = useState<TaskParams | null>(null);

  function handleSnackbarClose() {
    setIsSuccess(false);
  }

  function onSuccess(task: TaskParams) {
    setIsSuccess(true);
    setCreatedTask(task);
    handleClose();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>failed to Load</p>;
  }

  return (
    <>
      <h1>Tasks</h1>
      <button type="button" onClick={handleOpen}>
        タスク作成
      </button>
      <TaskList tasks={tasks} />

      <Snackbar
        open={isSuccess}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {createdTask?.title} を作成しました
        </Alert>
      </Snackbar>

      <CreateTaskModal
        isOpen={open}
        onClose={handleClose}
        onSuccess={onSuccess}
      />
    </>
  );
}
