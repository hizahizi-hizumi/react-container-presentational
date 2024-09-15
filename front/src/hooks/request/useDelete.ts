import useSWRMutation from "swr/mutation";

import type { ApiResponse } from "@/types/apiResponse";

interface FetcherArg {
  id: number;
}

async function fetcher<TData>(
  url: string,
  { arg }: { arg: FetcherArg },
): Promise<TData> {
  const { id } = arg;
  const urlWithId = `${url}/${id}`;

  const response = await fetch(urlWithId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<TData> = await response.json();

  if (!response.ok) {
    throw new Error(result.errorMessage);
  }

  return result.data;
}

interface UseDeleteReturns<TData> {
  delete: (arg: FetcherArg) => Promise<TData>;
  isMutating: boolean;
  data: TData | undefined;
  error: Error | undefined;
}

export function useDelete<TData>(url: string): UseDeleteReturns<TData> {
  const { trigger, isMutating, data, error } = useSWRMutation<
    TData,
    Error,
    string,
    FetcherArg
  >(url, fetcher);

  return { delete: trigger, isMutating, data, error };
}
