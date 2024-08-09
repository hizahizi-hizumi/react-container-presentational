import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { ENDPOINT } from "./ENDPOINT";
import { useDeleteTask } from "./useDeleteTask";

const server = setupServer();
const id = 1;

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate(`${ENDPOINT}/${id}`, undefined, true); // キャッシュのリセット
});
afterAll(() => server.close());

function setupResponse(data, message, status) {
  server.use(
    http.delete(`${ENDPOINT}/${id}`, () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.delete(`${ENDPOINT}/${id}`, () => {
      return HttpResponse.error();
    }),
  );
}

describe("useDeleteTask", () => {
  describe("正常時", () => {
    const task = { id: 1, title: "Test Task" };
    const args = [1, { title: "Deleted Task" }];

    beforeEach(() => {
      setupResponse(task, "", 200);
    });

    it("タスクの削除が成功すること", async () => {
      const { result } = renderHook(() => useDeleteTask());
      const { deleteTask } = result.current;

      expect(result.current).toEqual({
        deleteTask: expect.any(Function),
        isDeleting: false,
        deletedTask: undefined,
        deleteError: undefined,
      });

      await waitFor(async () => {
        await deleteTask(...args);

        expect(result.current).toEqual({
          deleteTask: expect.any(Function),
          isDeleting: false,
          deletedTask: task,
          deleteError: undefined,
        });
      });
    });
  });

  describe("異常時", () => {
    const args = [1, { title: "New Task" }];

    describe("リクエストでエラーが発生したとき", () => {
      const errorMessage = "server error";
      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useDeleteTask());
        const { deleteTask } = result.current;

        expect(result.current).toEqual({
          deleteTask: expect.any(Function),
          isDeleting: false,
          deletedTask: undefined,
          deleteError: undefined,
        });

        await waitFor(async () => {
          await expect(deleteTask(...args)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            deleteTask: expect.any(Function),
            isDeleting: false,
            deletedTask: undefined,
            deleteError: new Error(errorMessage),
          });
        });
      });
    });

    describe("ネットワークでエラーが発生したとき", () => {
      const errorMessage = "Failed to fetch";
      beforeEach(() => {
        setupNetworkError();
      });

      it("ネットワークエラーを返すこと", async () => {
        const { result } = renderHook(() => useDeleteTask());
        const { deleteTask } = result.current;

        expect(result.current).toEqual({
          deleteTask: expect.any(Function),
          isDeleting: false,
          deletedTask: undefined,
          deleteError: undefined,
        });

        await waitFor(async () => {
          await expect(deleteTask(...args)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            deleteTask: expect.any(Function),
            isDeleting: false,
            deletedTask: undefined,
            deleteError: new TypeError(errorMessage),
          });
        });
      });
    });
  });
});
