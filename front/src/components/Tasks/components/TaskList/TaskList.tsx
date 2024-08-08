import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { ButtonGroup, Button } from "@mui/material";

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

          <ButtonGroup>
            <Button color="inherit" onClick={() => onUpdate(task)}>
              <EditIcon />
            </Button>
            <Button color="error" onClick={() => onDelete(task)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </li>
      ))}
    </ul>
  );
}
