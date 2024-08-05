import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { ENDPOINT } from "./ENDPOINT";
import { useUpdateTask } from "./useUpdateTask";

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
    http.put(`${ENDPOINT}/${id}`, () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.put(`${ENDPOINT}/${id}`, () => {
      return HttpResponse.error();
    }),
  );
}

describe("useUpdateTask", () => {
  describe("正常時", () => {
    const task = { id: 1, title: "Test Task" };
    const args = [1, { title: "Updated Task" }];

    beforeEach(() => {
      setupResponse(task, "", 200);
    });

    it("タスクの更新が成功すること", async () => {
      const { result } = renderHook(() => useUpdateTask());
      const { updateTask } = result.current;

      expect(result.current).toEqual({
        updateTask: expect.any(Function),
        isUpdating: false,
        updatedTask: undefined,
        updateError: undefined,
      });

      await waitFor(async () => {
        await updateTask(...args);

        expect(result.current).toEqual({
          updateTask: expect.any(Function),
          isUpdating: false,
          updatedTask: task,
          updateError: undefined,
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
        const { result } = renderHook(() => useUpdateTask());
        const { updateTask } = result.current;

        expect(result.current).toEqual({
          updateTask: expect.any(Function),
          isUpdating: false,
          updatedTask: undefined,
          updateError: undefined,
        });

        await waitFor(async () => {
          await expect(updateTask(...args)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            updateTask: expect.any(Function),
            isUpdating: false,
            updatedTask: undefined,
            updateError: new Error(errorMessage),
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
        const { result } = renderHook(() => useUpdateTask());
        const { updateTask } = result.current;

        expect(result.current).toEqual({
          updateTask: expect.any(Function),
          isUpdating: false,
          updatedTask: undefined,
          updateError: undefined,
        });

        await waitFor(async () => {
          await expect(updateTask(...args)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            updateTask: expect.any(Function),
            isUpdating: false,
            updatedTask: undefined,
            updateError: new TypeError(errorMessage),
          });
        });
      });
    });
  });
});
