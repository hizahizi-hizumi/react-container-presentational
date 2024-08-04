import { useState } from "react";
import type React from "react";

import { CreateTaskModal } from "./_components/CreateTaskModal/CreateTaskModal";
import { SuccessSnackbar } from "./_components/SuccessSnackbar/SuccessSnackbar";
import { TaskList } from "./_components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleCreateModalOpen() {
    setIsCreateModalOpen(true);
  }

  function handleCreateModalClose() {
    setIsCreateModalOpen(false);
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTask, setCreatedTask] = useState<TaskParams | null>(null);

  function handleSnackbarOpen() {
    setIsSuccess(true);
  }

  function handleSnackbarClose() {
    setIsSuccess(false);
  }

  function onSuccess(task: TaskParams) {
    handleSnackbarOpen();
    setCreatedTask(task);
    handleCreateModalClose();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>failed to Load</p>;
  }

  return (
    <>
      <h1>Tasks</h1>
      <button type="button" onClick={handleCreateModalOpen}>
        タスク作成
      </button>
      <TaskList tasks={tasks} />

      <SuccessSnackbar
        isOpen={isSuccess}
        onClose={handleSnackbarClose}
        message={`タスク「${createdTask?.title}」を作成しました`}
      />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSuccess={onSuccess}
      />
    </>
  );
}
