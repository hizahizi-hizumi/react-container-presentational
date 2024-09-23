import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { ENDPOINT } from "./ENDPOINT";
import { useTasks } from "./useTasks";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate(ENDPOINT, undefined, true, false); // useSWR のキャッシュをリセット
});
afterAll(() => server.close());

function setupResponse(data, errorMessage, status) {
  server.use(
    http.get(ENDPOINT, () => {
      return HttpResponse.json({ data, errorMessage }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.get(ENDPOINT, () => {
      return HttpResponse.error();
    }),
  );
}

describe("useTasks", () => {
  describe("正常時", () => {
    const tasks = [{ id: 1, title: "Test Task" }];

    beforeEach(() => {
      setupResponse(tasks, "", 200);
    });

    it("タスクの取得が成功すること", async () => {
      const { result } = renderHook(() => useTasks());

      expect(result.current).toEqual({
        tasks: [],
        error: undefined,
        isLoading: true,
        isValidating: true,
      });

      await waitFor(() => {
        expect(result.current).toEqual({
          tasks,
          error: undefined,
          isLoading: false,
          isValidating: false,
        });
      });
    });
  });

  describe("異常時", () => {
    describe("リクエストでエラーが発生したとき", () => {
      const errorMessage = "server error";

      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useTasks());

        expect(result.current).toEqual({
          tasks: [],
          error: undefined,
          isLoading: true,
          isValidating: true,
        });

        await waitFor(() => {
          expect(result.current).toEqual({
            tasks: [],
            error: new Error(errorMessage),
            isLoading: false,
            isValidating: false,
          });
        });
      });
    });

    describe("ネットワークでエラーが発生したとき", () => {
      beforeEach(() => {
        setupNetworkError();
      });

      it("ネットワークエラーを返すこと", async () => {
        const { result } = renderHook(() => useTasks());

        expect(result.current).toEqual({
          tasks: [],
          error: undefined,
          isLoading: true,
          isValidating: true,
        });

        await waitFor(() => {
          expect(result.current).toEqual({
            tasks: [],
            error: new TypeError("Failed to fetch"),
            isLoading: false,
            isValidating: false,
          });
        });
      });
    });
  });
});
