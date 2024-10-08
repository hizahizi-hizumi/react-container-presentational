import { ThemeProvider } from "@mui/material";

import { theme } from "@/theme";
import { useCreateTask } from "../../hooks/useTasks";
import { CreateTaskModal } from "./CreateTaskModal";

vi.mock("../../hooks/useTasks");

describe("CreateTaskModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  const renderModal = async (isCreating = false, createTaskError = null) => {
    useCreateTask.mockReturnValue({
      createTask: vi.fn(),
      createTaskError,
      isCreating,
    });

    await waitFor(() => {
      render(
        <ThemeProvider theme={theme}>
          <CreateTaskModal
            isOpen={true}
            onClose={mockOnClose}
            onSuccess={mockOnSuccess}
          />
        </ThemeProvider>,
      );
    });
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

  describe("フォームが無効なとき", () => {
    beforeEach(() => {
      renderModal();
    });

    it("送信ボタンが無効になること", () => {
      expect(screen.getByText("作成")).toBeDisabled();
    });
  });

  describe("フォームが有効なとき", () => {
    beforeEach(() => {
      renderModal();
    });

    it("送信ボタンが有効になること", async () => {
      await waitFor(() => {
        fireEvent.change(screen.getByLabelText("タイトル"), {
          target: { value: "New Task" },
        });
      });

      expect(screen.getByText("作成")).not.toBeDisabled();
    });
  });

  describe("作成ボタンを押したとき", () => {
    const task = { title: "New Task" };

    beforeEach(() => {
      renderModal();
    });

    it("タスクの作成処理が呼び出されること", async () => {
      await waitFor(() => {
        fireEvent.change(screen.getByLabelText("タイトル"), {
          target: { value: task.title },
        });
      });

      fireEvent.click(screen.getByText("作成"));

      await waitFor(() =>
        expect(useCreateTask().createTask).toHaveBeenCalledWith({
          title: task.title,
        }),
      );
    });

    describe("タスクの作成に成功したとき", () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.change(screen.getByLabelText("タイトル"), {
            target: { value: task.title },
          });
        });

        fireEvent.click(screen.getByText("作成"));
      });

      it("onSuccess が呼び出されること", async () => {
        expect(mockOnSuccess).toHaveBeenCalledWith(task);
      });

      it("フォームがリセットされること", async () => {
        expect(screen.getByLabelText("タイトル")).toHaveValue("");
      });
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
