import type React from "react";

import { useForm } from "react-hook-form";
import type { Arguments } from "swr";
import useSWRMutation from "swr/mutation";

import { useTasks } from "./hooks/useTasks";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  type Inputs = {
    title: string;
  };

  const { register, handleSubmit } = useForm<Inputs>();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        <button type="submit" disabled={!canSubmit}>
          作成
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}
