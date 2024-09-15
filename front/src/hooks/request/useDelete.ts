import useSWRMutation from "swr/mutation";

import type { ApiResponse } from "@/types/apiResponse";

interface FetcherArg {
  id: number;
}

async function fetcher<U>(
  url: string,
  { arg }: { arg: FetcherArg },
): Promise<U> {
  const { id } = arg;
  const urlWithId = `${url}/${id}`;

  const response = await fetch(urlWithId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<U> = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}

interface UseDeleteReturns<U> {
  trigger: (arg: FetcherArg) => Promise<U>;
  isMutating: boolean;
  data: U | undefined;
  error: Error | undefined;
}

export function useDelete<U>(url: string): UseDeleteReturns<U> {
  const { trigger, isMutating, data, error } = useSWRMutation<
    U,
    Error,
    string,
    FetcherArg
  >(url, fetcher);

  return { trigger, isMutating, data, error };
}
