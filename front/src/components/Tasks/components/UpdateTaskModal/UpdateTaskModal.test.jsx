import { useUpdateTask } from "../../hooks/useTasks";
import { UpdateTaskModal } from "./UpdateTaskModal";

vi.mock("../../hooks/useTasks");

describe("UpdateTaskModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  const task = { id: 1, title: "Existing Task" };

  const renderModal = (isUpdating = false, updateError = null) => {
    useUpdateTask.mockReturnValue({
      updateTask: vi.fn(),
      updateError,
      isUpdating,
    });

    render(
      <UpdateTaskModal
        task={task}
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />,
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
      expect(screen.getByText("タスク更新")).toBeInTheDocument();
      expect(screen.getByText("キャンセル")).toBeInTheDocument();
      expect(screen.getByText("更新")).toBeInTheDocument();
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

  describe("タスクの更新を処理しているとき", () => {
    beforeEach(() => {
      renderModal(true);
    });

    it("送信ボタンが無効になること", () => {
      expect(screen.getByText("更新")).toBeDisabled();
    });
  });

  describe("タスクの更新に成功したとき", () => {
    const taskParams = { title: "Updated Task" };

    beforeEach(() => {
      renderModal();
    });

    it("onSuccess が呼び出されること", async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: taskParams.title },
      });
      fireEvent.click(screen.getByText("更新"));

      await waitFor(() =>
        expect(useUpdateTask().updateTask).toHaveBeenCalledWith(
          task.id,
          taskParams,
        ),
      );
      expect(mockOnSuccess).toHaveBeenCalledWith(taskParams);
    });
  });

  describe("タスクの更新に失敗したとき", () => {
    const errorMessage = "Failed to update task";

    beforeEach(() => {
      renderModal(false, { message: errorMessage });
    });

    it("エラーメッセージが表示されること", () => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
