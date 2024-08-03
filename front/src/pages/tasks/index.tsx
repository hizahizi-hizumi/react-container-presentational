import type React from "react";

import { useTasks } from "./hooks/useTasks";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>failed to Load</p>;
  }

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}
