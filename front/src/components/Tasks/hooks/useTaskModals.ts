import type { Task } from "@/types/task";
import { useState } from "react";
import { useModal } from "./useModal";

interface useTaskModalsReturns {
  create: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  update: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  delete: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  selectedTask: Task | null;
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function useTaskModals(): useTaskModalsReturns {
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

  const onUpdate = (task: Task) => {
    setSelectedTask(task);
    openUpdateModal();
  };

  const onDelete = (task: Task) => {
    setSelectedTask(task);
    openDeleteModal();
  };

  return {
    create: {
      isOpen: isCreateModalOpen,
      open: openCreateModal,
      close: closeCreateModal,
    },
    update: {
      isOpen: isUpdateModalOpen,
      open: openUpdateModal,
      close: closeUpdateModal,
    },
    delete: {
      isOpen: isDeleteModalOpen,
      open: openDeleteModal,
      close: closeDeleteModal,
    },
    selectedTask,
    onUpdate,
    onDelete,
  };
}
