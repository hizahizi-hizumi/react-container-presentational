import useSWRMutation from "swr/mutation";

import type { ApiResponse } from "@/types/apiResponse";

interface FetcherArg<TParams> {
  params: TParams;
}

async function fetcher<TParams, TData>(
  url: string,
  { arg }: { arg: FetcherArg<TParams> },
): Promise<TData> {
  const { params } = arg;

  const response = await fetch(url, {
    method: "POST",
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

interface UsePostReturns<TParams, TData> {
  post: (arg: FetcherArg<TParams>) => Promise<TData>;
  isMutating: boolean;
  data: TData | undefined;
  error: Error | undefined;
}

export function usePost<TParams, TData>(
  url: string,
): UsePostReturns<TParams, TData> {
  const { trigger, isMutating, data, error } = useSWRMutation<
    TData,
    Error,
    string,
    FetcherArg<TParams>
  >(url, fetcher);

  return { post: trigger, isMutating, data, error };
}
