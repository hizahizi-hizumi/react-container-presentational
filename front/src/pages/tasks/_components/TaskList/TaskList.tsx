import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
}

export function TaskList(props: TaskListProps): React.JSX.Element {
  const { tasks, onUpdate } = props;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button type="button" onClick={() => onUpdate(task)}>
            編集
          </button>
        </li>
      ))}
    </ul>
  );
}
