import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mutate } from "swr";

import { useGet } from "./useGet";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mutate({ url: "/get" }, undefined, true); // useSWR のキャッシュをクリア
});
afterAll(() => server.close());

function setupResponse(data, message, status) {
  server.use(
    http.get("/get", () => {
      return HttpResponse.json({ data, message }, { status });
    }),
  );
}

function setupNetworkError() {
  server.use(
    http.get("/get", () => {
      return HttpResponse.error();
    }),
  );
}

describe("useGet", () => {
  describe("正常時", () => {
    const data = "value";

    beforeEach(() => {
      setupResponse(data, "", 200);
    });

    it("データ取得が成功すること", async () => {
      const { result } = renderHook(() => useGet("/get"));

      expect(result.current).toEqual({
        data: undefined,
        error: undefined,
        isLoading: true,
      });

      await waitFor(() => {
        expect(result.current).toEqual({
          data: data,
          error: undefined,
          isLoading: false,
        });
      });
    });

    describe("クエリパラメータを指定したとき", () => {
      const data = "value";
      const query = { param: "test" };

      beforeEach(() => {
        setupResponse(data, "", 200);
      });

      it("データ取得が成功すること", async () => {
        const { result } = renderHook(() => useGet("/get", query));

        expect(result.current).toEqual({
          data: undefined,
          error: undefined,
          isLoading: true,
        });

        await waitFor(() => {
          expect(result.current).toEqual({
            data: data,
            error: undefined,
            isLoading: false,
          });
        });
      });
    });
  });

  describe("異常時", () => {
    describe("リクエストでエラーが発生したとき", () => {
      const errorMessage = "server error";

      beforeEach(() => {
        setupResponse(undefined, errorMessage, 400);
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useGet("/get"));

        expect(result.current).toEqual({
          data: undefined,
          error: undefined,
          isLoading: true,
        });

        await waitFor(() => {
          expect(result.current).toEqual({
            data: undefined,
            error: new Error(errorMessage),
            isLoading: false,
          });
        });
      });
    });

    describe("ネットワークでエラーが発生したとき", () => {
      beforeEach(() => {
        setupNetworkError();
      });

      it("エラーを返すこと", async () => {
        const { result } = renderHook(() => useGet("/get"));

        expect(result.current).toEqual({
          data: undefined,
          error: undefined,
          isLoading: true,
        });

        await waitFor(() => {
          expect(result.current).toEqual({
            data: undefined,
            error: new TypeError("Failed to fetch"),
            isLoading: false,
          });
        });
      });
    });
  });
});
