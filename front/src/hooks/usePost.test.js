import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { usePost } from "./usePost";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate("/post", undefined, true); // キャッシュのリセット
});
afterAll(() => server.close());

function setupResponse(data, message, status) {
  server.use(
    http.post("/post", () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.post("/post", () => {
      return HttpResponse.error();
    }),
  );
}

describe("usePost", () => {
  describe("正常時", () => {
    const data = { result: "value" };
    const params = { input: "test" };

    beforeEach(() => {
      setupResponse(data, "", 200);
    });

    it("データ送信が成功すること", async () => {
      const { result } = renderHook(() => usePost("/post"));
      const { trigger } = result.current;

      let response;
      await waitFor(async () => {
        response = await trigger({ params });
      });

      expect(response).toEqual(data);
      expect(result.current).toEqual({
        trigger: expect.any(Function),
        isMutating: false,
        data: data,
        error: undefined,
      });
    });
  });

  describe("異常時", () => {
    describe("リクエストでエラーが発生したとき", () => {
      const errorMessage = "server error";
      const params = { input: "test" };

      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => usePost("/post"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ params })).rejects.toThrow(errorMessage);
        });

        expect(result.current).toEqual({
          trigger: expect.any(Function),
          isMutating: false,
          data: undefined,
          error: new Error(errorMessage),
        });
      });
    });

    describe("ネットワークでエラーが発生したとき", () => {
      const params = { input: "test" };

      beforeEach(() => {
        setupNetworkError()
      });

      it("ネットワークエラーを返すこと", async () => {
        const { result } = renderHook(() => usePost("/post"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ params })).rejects.toThrow("Failed to fetch");
        });

        expect(result.current).toEqual({
          trigger: expect.any(Function),
          isMutating: false,
          data: undefined,
          error: new Error("Failed to fetch"),
        });
      });
    });
  });
});
