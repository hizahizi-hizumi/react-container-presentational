import type React from "react";

import type { Arguments } from "swr";
import useSWRMutation from "swr/mutation";

import { CreateTaskForm } from "./_components/CreateTaskForm/CreateTaskForm";
import { useTasks } from "./hooks/useTasks";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  type Inputs = {
    title: string;
  };

  async function createTask(url: string, { arg }: { arg: Arguments }) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    return res.json();
  }

  const { trigger, isMutating } = useSWRMutation("/tasks", createTask);

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
