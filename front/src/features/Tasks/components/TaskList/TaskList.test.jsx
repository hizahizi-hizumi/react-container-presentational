import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useTasks } from "../../hooks/useTasks";
import { TaskList } from "./TaskList";

vi.mock("../../hooks/useTasks");

describe("TaskList", () => {
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();
  const tasks = [
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
  ];

  const renderList = async (tasks) => {
    useTasks.mockReturnValue({
      tasks,
    });

    await waitFor(() => {
      render(
        <TaskList
          onEditButtonClick={mockOnUpdate}
          onDeleteButtonClick={mockOnDelete}
        />,
      );
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("タスクがないとき", () => {
    it("'タスクがありません' が表示されること", () => {
      renderList([]);
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });
  });

  describe("タスクがあるとき", () => {
    it("タスクリストが表示されること", () => {
      renderList(tasks);
      for (const task of tasks) {
        expect(screen.getByText(task.title)).toBeInTheDocument();
      }
    });
  });

  describe("更新ボタンがクリックされたとき", () => {
    it("onUpdate が呼び出されること", () => {
      renderList(tasks);
      fireEvent.click(screen.getAllByTestId("EditIcon")[0].closest("button"));
      expect(mockOnUpdate).toHaveBeenCalledWith(tasks[0]);
    });
  });

  describe("削除ボタンがクリックされたとき", () => {
    it("onDelete が呼び出されること", () => {
      renderList(tasks);
      fireEvent.click(screen.getAllByTestId("DeleteIcon")[0].closest("button"));
      expect(mockOnDelete).toHaveBeenCalledWith(tasks[0]);
    });
  });
});
