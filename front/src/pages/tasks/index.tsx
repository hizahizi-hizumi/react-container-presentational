import { useState } from "react";
import type React from "react";

import type { Task } from "@/types/task";
import { CreateTaskModal } from "./_components/CreateTaskModal/CreateTaskModal";
import { SuccessSnackbar } from "./_components/SuccessSnackbar/SuccessSnackbar";
import { TaskList } from "./_components/TaskList/TaskList";
import { UpdateTaskModal } from "./_components/UpdateTaskModal/UpdateTaskModal";
import { useModal } from "./hooks/useModal";
import { useTasks } from "./hooks/useTasks";
import type { TaskParams } from "./types/taskParams";

export default function Tasks(): React.JSX.Element {
  const { tasks, error, isLoading } = useTasks();

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useModal();

  const {
    isOpen: isUpdateModalOpen,
    open: openUpdateModal,
    close: closeUpdateModal,
  } = useModal();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function onUpdate(task: Task) {
    setSelectedTask(task);
    openUpdateModal();
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function handleSnackbarOpen() {
    setIsSuccess(true);
  }

  function handleSnackbarClose() {
    setIsSuccess(false);
  }

  function onCreateSuccess(task: TaskParams) {
    handleSnackbarOpen();
    setToastMessage(`タスク「${task.title}」を作成しました`);
    closeCreateModal();
  }

  function onUpdateSuccess(task: TaskParams) {
    handleSnackbarOpen();
    setToastMessage(`タスク「${task.title}」を更新しました`);
    closeUpdateModal();
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
      <button type="button" onClick={openCreateModal}>
        タスク作成
      </button>
      <TaskList tasks={tasks} onUpdate={onUpdate} />

      <SuccessSnackbar
        isOpen={isSuccess}
        onClose={handleSnackbarClose}
        message={toastMessage}
      />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSuccess={onCreateSuccess}
      />

      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onSuccess={onUpdateSuccess}
        task={selectedTask}
      />
    </>
  );
}
