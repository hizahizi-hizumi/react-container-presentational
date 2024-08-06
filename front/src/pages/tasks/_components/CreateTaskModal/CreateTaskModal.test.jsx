import { useCreateTask } from "../../hooks/useTasks";
import { CreateTaskModal } from "./CreateTaskModal";

vi.mock("../../hooks/useTasks");

describe("CreateTaskModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  const renderModal = (isCreating = false, createError = null) => {
    useCreateTask.mockReturnValue({
      createTask: vi.fn(),
      createError,
      isCreating,
    });

    render(
      <CreateTaskModal
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
      expect(screen.getByText("タスク作成")).toBeInTheDocument();
      expect(screen.getByText("キャンセル")).toBeInTheDocument();
      expect(screen.getByText("作成")).toBeInTheDocument();
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

  describe("タスクの作成を処理しているとき", () => {
    beforeEach(() => {
      renderModal(true);
    });

    it("送信ボタンが無効になること", () => {
      expect(screen.getByText("作成")).toBeDisabled();
    });
  });

  describe("タスクの作成に成功したとき", () => {
    const task = { title: "New Task" };

    beforeEach(() => {
      useCreateTask.mockReturnValue({
        createTask: vi.fn().mockResolvedValueOnce(task),
        createError: null,
        isCreating: false,
      });

      render(
        <CreateTaskModal
          isOpen={true}
          onClose={mockOnClose}
          onSuccess={mockOnSuccess}
        />,
      );
    });

    it("onSuccess が呼び出されること", async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: task.title },
      });
      fireEvent.click(screen.getByText("作成"));

      await waitFor(() =>
        expect(useCreateTask().createTask).toHaveBeenCalledWith(task),
      );
      expect(mockOnSuccess).toHaveBeenCalledWith(task);
    });
  });

  describe("タスクの作成に失敗したとき", () => {
    const errorMessage = "Failed to create task";

    beforeEach(() => {
      renderModal(false, { message: errorMessage });
    });

    it("エラーメッセージが表示されること", () => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
