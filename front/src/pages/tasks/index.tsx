import type React from "react";

import { useGet } from "@/hooks/useGet";
import type { Task } from "@/types/task";

export default function Tasks(): React.JSX.Element {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  const { data, error, isLoading } = useGet<GetTasksResponseBody>("/tasks");
  const tasks = data?.tasks ?? [];

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
