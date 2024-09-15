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

interface UseGetReturns<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

type Query = Record<string, string>;

export function useGet<T>(url: string, query?: Query): UseGetReturns<T> {
  const queryString = new URLSearchParams(query).toString();
  const urlWithQueryString = queryString ? `${url}?${queryString}` : url;

  const { data, error, isLoading } = useSWR<T, Error, string>(
    urlWithQueryString,
    fetcher,
  );

  return { data, error, isLoading };
}
