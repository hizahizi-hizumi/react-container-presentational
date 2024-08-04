import useSWR from "swr";

import type { ApiResponse } from "@/types/apiResponse";

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}

interface UseGetParams<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
}

export function useGet<T>(url: string): UseGetParams<T> {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);

  return { data, error, isLoading };
}
