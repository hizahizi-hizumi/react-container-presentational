import { useState } from "react";
import type React from "react";

import { CreateTaskModal } from "./_components/CreateTaskModal/CreateTaskModal";
import { TaskList } from "./_components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading, api } = useTasks();
  const { createdTask, createError } = api.create;

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onSuccess(_: TaskParams) {
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
      {createdTask && !createError && <p>Task created: {createdTask.title}</p>}
      <TaskList tasks={tasks} />

      <CreateTaskModal
        isOpen={open}
        onClose={handleClose}
        onSuccess={onSuccess}
      />
    </>
  );
}
