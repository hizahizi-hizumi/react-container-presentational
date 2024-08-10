import userEvent from "@testing-library/user-event";

import { CreateTaskFormContent } from "./CreateTaskFormContent";

describe("CreateTaskFormContent", () => {
  const registerMock = vi.fn();
  const errorsMock = {};

  it("正しくレンダリングされていること", () => {
    render(
      <CreateTaskFormContent register={registerMock} errors={errorsMock} />,
    );

    expect(screen.getByLabelText("タイトル")).toBeInTheDocument();
  });

  it("正しく register が呼ばれること", () => {
    render(
      <CreateTaskFormContent register={registerMock} errors={errorsMock} />,
    );

    expect(registerMock).toHaveBeenCalledWith("title", {
      required: { value: true, message: "必須です" },
      maxLength: {
        value: 255,
        message: "255文字以内で入力してください",
      },
    });
  });

  describe("バリデーションエラーがあるとき", () => {
    describe("タイトルが空のとき", () => {
      it("エラーメッセージが表示されること", () => {
        // TODO: プロダクトのエラーメッセージを変更してもテストが落ちないので修正する
        errorsMock.title = { type: "required", message: "必須です" };
        render(
          <CreateTaskFormContent register={registerMock} errors={errorsMock} />,
        );

        expect(screen.getByText("必須です")).toBeInTheDocument();
      });
    });
    describe("タイトルが255文字以上のとき", () => {
      it("エラーメッセージが表示されること", () => {
        errorsMock.title = {
          type: "maxLength",
          message: "255文字以内で入力してください",
        };
        render(
          <CreateTaskFormContent register={registerMock} errors={errorsMock} />,
        );

        expect(
          screen.getByText("255文字以内で入力してください"),
        ).toBeInTheDocument();
      });
    });
  });
});
