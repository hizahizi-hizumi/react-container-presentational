import type React from "react";

import { CreateTaskForm } from "./_components/CreateTaskForm/CreateTaskForm";
import { useTasks } from "./hooks/useTasks";
import { usePost } from "@/hooks/usePost";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  type Inputs = {
    title: string;
  };

  const { trigger, isMutating } = usePost("/tasks");

  function onSubmit(data: Inputs) {
    trigger(data);
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
