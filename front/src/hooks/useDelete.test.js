import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { useDelete } from "./useDelete";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate("/delete/1", undefined, true); // キャッシュのリセット
});
afterAll(() => server.close());

function setupResponse(data, message, status) {
  server.use(
    http.delete("/delete/1", () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.delete("/delete/1", () => {
      return HttpResponse.error();
    }),
  );
}

describe("useDelete", () => {
  describe("正常時", () => {
    const data = { result: "value" };
    const id = 1;

    beforeEach(() => {
      setupResponse(data, "", 200);
    });

    it("データ削除が成功すること", async () => {
      const { result } = renderHook(() => useDelete("/delete"));
      const { trigger } = result.current;

      let response;
      await waitFor(async () => {
        response = await trigger({ id });
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
      const id = 1;

      beforeEach(() => {
        setupResponse(undefined, errorMessage, 500);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useDelete("/delete"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ id })).rejects.toThrow(errorMessage);
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
      const id = 1;

      beforeEach(() => {
        setupNetworkError();
      });

      it("ネットワークエラーを返すこと", async () => {
        const { result } = renderHook(() => useDelete("/delete"));
        const { trigger } = result.current;

        await waitFor(async () => {
          await expect(trigger({ id })).rejects.toThrow("Failed to fetch");
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
