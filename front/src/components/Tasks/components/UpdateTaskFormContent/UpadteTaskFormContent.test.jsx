import { UpdateTaskFormContent } from "./UpdateTaskFormContent";

describe("UpdateTaskFormContent", () => {
  const task = {
    title: "test title",
  };
  const registerMock = vi.fn();

  it("正しくレンダリングされていること", () => {
    render(<UpdateTaskFormContent task={task} register={registerMock} />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue(task.title);
  });

  it("正しく register が呼ばれること", () => {
    render(<UpdateTaskFormContent task={task} register={registerMock} />);

    expect(registerMock).toHaveBeenCalledWith("title");
  });
});
