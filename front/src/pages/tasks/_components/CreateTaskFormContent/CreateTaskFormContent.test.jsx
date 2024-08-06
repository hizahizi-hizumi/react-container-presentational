import userEvent from "@testing-library/user-event";

import { CreateTaskFormContent } from "./CreateTaskFormContent";

describe("CreateTaskFormContent", () => {
  const registerMock = vi.fn();

  it("正しくレンダリングされていること", () => {
    render(<CreateTaskFormContent register={registerMock} />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("正しく register が呼ばれること", () => {
    render(<CreateTaskFormContent register={registerMock} />);

    expect(registerMock).toHaveBeenCalledWith("title");
  });
});