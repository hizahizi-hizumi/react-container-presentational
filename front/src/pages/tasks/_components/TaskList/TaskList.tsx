import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList(props: TaskListProps): React.JSX.Element {
  const { tasks } = props;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
