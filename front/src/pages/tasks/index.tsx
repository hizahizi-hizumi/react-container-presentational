import { useState } from "react";
import type React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { CreateTaskForm } from "./_components/CreateTaskForm/CreateTaskForm";
import { TaskList } from "./_components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading, api } = useTasks();
  const { createTask, isMutating, createdTask, createError } = api.create;

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onSubmit(data: TaskParams) {
    createTask(data);
    handleClose();
  }

  const canSubmit = !isMutating;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>failed to Load</p>;
  }

  return (
    <>
      <h1>Tasks</h1>
      <button onClick={handleOpen}>タスク作成</button>
      {createError && <p>{createError.message}</p>}
      {(createdTask && !createError) && <p>Task created: {createdTask.title}</p>}
      <TaskList tasks={tasks} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>タスク作成</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CreateTaskForm canSubmit={canSubmit} onSubmit={onSubmit} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </>
  );
}
