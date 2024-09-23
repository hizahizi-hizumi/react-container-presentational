import { ThemeProvider } from "@mui/material";

import { theme } from "@/theme";
import { useDeleteTask } from "../../hooks/useTasks";
import { DeleteTaskModal } from "./DeleteTaskModal";

vi.mock("../../hooks/useTasks");

describe("DeleteTaskModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  const task = { id: 1, title: "Existing Task" };

  const renderModal = (isDeleting = false, deleteTaskError = null) => {
    useDeleteTask.mockReturnValue({
      deleteTask: vi.fn(),
      isDeleting,
      deleteTaskError,
    });

    render(
      <ThemeProvider theme={theme}>
        <DeleteTaskModal
          isOpen={true}
          onClose={mockOnClose}
          onSuccess={mockOnSuccess}
          task={task}
        />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("モーダルが開いたとき", () => {
    beforeEach(() => {
      renderModal();
    });

    it("正しくレンダリングされること", () => {
      expect(screen.getByText("タスク削除")).toBeInTheDocument();
      expect(screen.getByText("キャンセル")).toBeInTheDocument();
      expect(screen.getByText("削除")).toBeInTheDocument();
      expect(
        screen.getByText(`${task.title}を削除しますか？`),
      ).toBeInTheDocument();
    });
  });

  describe("キャンセルボタンがクリックされたとき", () => {
    beforeEach(() => {
      renderModal();
    });

    it("onClose が呼び出されること", () => {
      fireEvent.click(screen.getByText("キャンセル"));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("タスクの削除を処理しているとき", () => {
    beforeEach(() => {
      renderModal(true);
    });

    it("送信ボタンが無効になること", () => {
      expect(screen.getByText("削除")).toBeDisabled();
    });
  });

  describe("タスクの削除に成功したとき", () => {
    const taskParams = { title: "Existing Task" };

    beforeEach(() => {
      renderModal();
    });

    it("onSuccess が呼び出されること", async () => {
      fireEvent.click(screen.getByText("削除"));

      await waitFor(() =>
        expect(useDeleteTask().deleteTask).toHaveBeenCalledWith(task.id),
      );
      expect(mockOnSuccess).toHaveBeenCalledWith(taskParams);
    });
  });

  describe("タスクの削除に失敗したとき", () => {
    const errorMessage = "Failed to delete task";

    beforeEach(() => {
      renderModal(false, { message: errorMessage });
    });

    it("エラーメッセージが表示されること", () => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
