import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { ENDPOINT } from "./ENDPOINT";
import { useCreateTask } from "./useCreateTask";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate(ENDPOINT, undefined, true); // キャッシュのリセット
});
afterAll(() => server.close());

function setupResponse(data, errorMessage, status) {
  server.use(
    http.post(ENDPOINT, () => {
      return HttpResponse.json({ data, errorMessage }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.post(ENDPOINT, () => {
      return HttpResponse.error();
    }),
  );
}

describe("useCreateTask", () => {
  describe("正常時", () => {
    const task = { id: 1, title: "Test Task" };
    const params = { title: "New Task" };

    beforeEach(() => {
      setupResponse(task, "", 200);
    });

    it("タスクの作成が成功すること", async () => {
      const { result } = renderHook(() => useCreateTask());

      const { createTask } = result.current;

      expect(result.current).toEqual({
        createTask: expect.any(Function),
        isCreating: false,
        createdTask: undefined,
        createTaskError: undefined,
      });

      await waitFor(async () => {
        await createTask(params);

        expect(result.current).toEqual({
          createTask: expect.any(Function),
          isCreating: false,
          createdTask: task,
          createTaskError: undefined,
        });
      });
    });
  });

  describe("異常時", () => {
    const params = { title: "New Task" };

    describe("リクエストでエラーが発生したとき", () => {
      const errorMessage = "server error";
      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useCreateTask());
        const { createTask } = result.current;

        expect(result.current).toEqual({
          createTask: expect.any(Function),
          isCreating: false,
          createdTask: undefined,
          createTaskError: undefined,
        });

        await waitFor(async () => {
          await expect(createTask(params)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            createTask: expect.any(Function),
            isCreating: false,
            createdTask: undefined,
            createTaskError: new Error(errorMessage),
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
        const { result } = renderHook(() => useCreateTask());
        const { createTask } = result.current;

        expect(result.current).toEqual({
          createTask: expect.any(Function),
          isCreating: false,
          createdTask: undefined,
          createTaskError: undefined,
        });

        await waitFor(async () => {
          await expect(createTask(params)).rejects.toThrow(errorMessage);

          expect(result.current).toEqual({
            createTask: expect.any(Function),
            isCreating: false,
            createdTask: undefined,
            createTaskError: new TypeError(errorMessage),
          });
        });
      });
    });
  });
});
