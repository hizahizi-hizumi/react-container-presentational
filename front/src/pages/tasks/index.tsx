import type React from "react";

import { CreateTaskForm } from "./_components/CreateTaskForm/CreateTaskForm";
import { TaskList } from "./_components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading, api } = useTasks();
  const { createTask, isMutating, createdTask, createError } = api.create;

  function onSubmit(data: TaskParams) {
    createTask(data);
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
      {createError && <p>{createError.message}</p>}
      {(createdTask && !createError) && <p>Task created: {createdTask.title}</p>}
      <CreateTaskForm canSubmit={canSubmit} onSubmit={onSubmit} />
      <TaskList tasks={tasks} />
    </>
  );
}
