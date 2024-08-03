import type React from "react";
import { useEffect, useState } from "react";

import type { Task } from "@/types/task";

export default function Tasks(): React.JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  interface GetTasksResponseBody {
    tasks: Task[];
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/tasks");
      const body: GetTasksResponseBody = await response.json();
      const tasks = body.tasks;
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

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
