import useSWRMutation from "swr/mutation";

import type { ApiResponse } from "@/types/apiResponse";

interface FetcherArg<TParams> {
  id: number;
  params: TParams;
}

async function fetcher<TParams, TData>(
  url: string,
  { arg }: { arg: FetcherArg<TParams> },
): Promise<TData> {
  const { id, params } = arg;
  const urlWithId = `${url}/${id}`;

  const response = await fetch(urlWithId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result: ApiResponse<TData> = await response.json();

  if (!response.ok) {
    throw new Error(result.errorMessage);
  }

  return result.data;
}

interface UsePutReturns<TParams, TData> {
  put: (arg: FetcherArg<TParams>) => Promise<TData>;
  isMutating: boolean;
  data: TData | undefined;
  error: Error | undefined;
}

export function usePut<TParams, TData>(
  url: string,
): UsePutReturns<TParams, TData> {
  const { trigger, isMutating, data, error } = useSWRMutation<
    TData,
    Error,
    string,
    FetcherArg<TParams>
  >(url, fetcher);

  return { put: trigger, isMutating, data, error };
}
