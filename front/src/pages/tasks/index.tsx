import { useState } from "react";
import type React from "react";

import type { Task } from "@/types/task";
import { CreateTaskModal } from "./_components/CreateTaskModal/CreateTaskModal";
import { DeleteTaskModal } from "./_components/DeleteTaskModal/DeleteTaskModal";
import { SuccessSnackbar } from "./_components/SuccessSnackbar/SuccessSnackbar";
import { TaskList } from "./_components/TaskList/TaskList";
import { UpdateTaskModal } from "./_components/UpdateTaskModal/UpdateTaskModal";
import { useModal } from "./hooks/useModal";
import { useSnackbar } from "./hooks/useSnackbar";
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

  const {
    isOpen: isDeleteModalOpen,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useModal();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function onUpdate(task: Task) {
    setSelectedTask(task);
    openUpdateModal();
  }

  function onDelete(task: Task) {
    setSelectedTask(task);
    openDeleteModal();
  }

  const {
    isOpen: isOpenSnackbar,
    open: openSnackbar,
    close: closeSnackbar,
    message,
  } = useSnackbar();

  function onCreateSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を作成しました`);
    closeCreateModal();
  }

  function onUpdateSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を更新しました`);
    closeUpdateModal();
  }

  function onDeleteSuccess(task: TaskParams) {
    openSnackbar(`タスク「${task.title}」を削除しました`);
    closeDeleteModal();
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
      <TaskList tasks={tasks} onUpdate={onUpdate} onDelete={onDelete} />

      <SuccessSnackbar
        isOpen={isOpenSnackbar}
        onClose={closeSnackbar}
        message={message}
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

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onSuccess={onDeleteSuccess}
        task={selectedTask}
      />
    </>
  );
}
