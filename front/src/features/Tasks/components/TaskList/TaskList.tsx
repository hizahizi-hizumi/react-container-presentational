import { List } from "@mui/material";

import { useTasks } from "@/features/Tasks/hooks/useTasks";
import type { Task } from "@/types/task";
import { TaskItem } from "../TaskItem/TaskItem";

interface TaskListProps {
  onEditButtonClick: (task: Task) => void;
  onDeleteButtonClick: (task: Task) => void;
}

export function TaskList(props: TaskListProps): JSX.Element {
  const { onEditButtonClick, onDeleteButtonClick } = props;
  const { tasks, error, isLoading, isValidating } = useTasks();

  if (isLoading) {
    return <p>読み込み中</p>;
  }

  if (error) {
    return <p>タスク取得中にエラーが発生しました: {error.message}</p>;
  }

  if (tasks.length === 0) {
    return <p>タスクがありません</p>;
  }

  return (
    <>
      <List>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        ))}
      </List>
      {isValidating && <p>更新中</p>}
    </>
  );
}
