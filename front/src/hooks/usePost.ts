import useSWRMutation from "swr/mutation";

import type { ApiResponse } from "@/types/apiResponse";

interface FetcherArg<T> {
  params: T;
}

async function fetcher<T, U>(
  url: string,
  { arg }: { arg: FetcherArg<T> },
): Promise<U> {
  const { params } = arg;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result: ApiResponse<U> = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}

interface UsePostParams<T, U> {
  trigger: (arg: FetcherArg<T>) => Promise<U>;
  isMutating: boolean;
  data: U | undefined;
  error: Error | undefined;
}

export function usePost<T, U>(url: string): UsePostParams<T, U> {
  const { trigger, isMutating, data, error } = useSWRMutation<
    U,
    Error,
    string,
    FetcherArg<T>
  >(url, fetcher);

  return { trigger, isMutating, data, error };
}
