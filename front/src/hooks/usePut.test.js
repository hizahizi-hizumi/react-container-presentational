import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { usePut } from "./usePut";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate("/put/1", undefined, true); // キャッシュのリセット
});
afterAll(() => server.close());

function setupResponse(data, message, status) {
  server.use(
    http.put("/put/1", () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.put("/put/1", () => {
      return HttpResponse.error();
    }),
  );
}

describe("usePut", () => {
  describe("正常時", () => {
    const data = { result: "value" };
    const params = { input: "test" };
    const id = 1;

    beforeEach(() => {
      setupResponse(data, "", 200);
    });

    it("データ送信が成功すること", async () => {
      const { result } = renderHook(() => usePut("/put"));
      const { trigger } = result.current;

      let response;
      await waitFor(async () => {
        response = await trigger({ id, params });
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
      const id = 1;

      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => usePut("/put"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ id, params })).rejects.toThrow(errorMessage);
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
      const id = 1;

      beforeEach(() => {
        setupNetworkError();
      });

      it("ネットワークエラーを返すこと", async () => {
        const { result } = renderHook(() => usePut("/put"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ id, params })).rejects.toThrow(
            "Failed to fetch",
          );
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
