import { useState } from "react";
import { mutate } from "swr";

import type { ApiResponse } from "@/types/apiResponse";

async function postData<TParams, TData>(
  url: string,
  params: TParams,
): Promise<TData> {
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
  post: (params: TParams) => Promise<void>;
  data: TData | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export function usePost<TParams, TData>(
  url: string,
): UsePostReturns<TParams, TData> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  async function post(params: TParams) {
    setIsLoading(true);
    setError(undefined);

    try {
      const newData = await postData<TParams, TData>(url, params);
      setData(newData);

      mutate(url, (currentData: TData[] | undefined) => {
        return currentData ? [newData, ...currentData] : [newData];
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { post, data, isLoading, error };
}
