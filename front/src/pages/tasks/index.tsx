import type React from "react";

import useSWR from "swr";

import type { Task } from "@/types/task";

export default function Tasks(): React.JSX.Element {
  interface GetTasksResponseBody {
    tasks: Task[];
  }

  function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
  }

  const { data, error, isLoading } = useSWR<GetTasksResponseBody>(
    "/tasks",
    fetcher,
  );
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
