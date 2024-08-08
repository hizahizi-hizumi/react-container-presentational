import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskList } from "./TaskList";

describe("TaskList", () => {
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();
  const tasks = [
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("タスクがないとき", () => {
    it("'タスクがありません' が表示されること", () => {
      render(
        <TaskList tasks={[]} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />,
      );
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });
  });

  describe("タスクがあるとき", () => {
    it("タスクリストが表示されること", () => {
      render(
        <TaskList
          tasks={tasks}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />,
      );
      for (const task of tasks) {
        expect(screen.getByText(task.title)).toBeInTheDocument();
      }
    });
  });

  describe("更新ボタンがクリックされたとき", () => {
    it("onUpdate が呼び出されること", () => {
      render(
        <TaskList
          tasks={tasks}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />,
      );
      fireEvent.click(screen.getAllByText("編集")[0]);
      expect(mockOnUpdate).toHaveBeenCalledWith(tasks[0]);
    });
  });

  describe("削除ボタンがクリックされたとき", () => {
    it("onDelete が呼び出されること", () => {
      render(
        <TaskList
          tasks={tasks}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />,
      );
      fireEvent.click(screen.getAllByText("削除")[0]);
      expect(mockOnDelete).toHaveBeenCalledWith(tasks[0]);
    });
  });
});
