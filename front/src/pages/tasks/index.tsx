import type React from "react";

import { CreateTaskForm } from "./_components/CreateTaskForm/CreateTaskForm";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading, api } = useTasks();
  const { createTask, isMutating } = api.create;

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
      <CreateTaskForm canSubmit={canSubmit} onSubmit={onSubmit} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}
