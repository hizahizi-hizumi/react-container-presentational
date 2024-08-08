import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskList(props: TaskListProps): React.JSX.Element {
  const { tasks, onUpdate, onDelete } = props;

  if (tasks.length === 0) {
    return <p>タスクがありません</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}

          <button type="button" onClick={() => onUpdate(task)}>
            編集
          </button>
          <button type="button" onClick={() => onDelete(task)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
