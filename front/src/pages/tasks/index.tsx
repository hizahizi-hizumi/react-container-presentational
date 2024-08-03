import type React from "react";
import { useEffect } from "react";

export default function Tasks(): React.JSX.Element {
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/tasks");
      const tasks = await response.json();
      console.log(tasks);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
    </>
  );
}
