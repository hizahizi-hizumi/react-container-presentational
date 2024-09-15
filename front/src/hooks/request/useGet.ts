import useSWR from "swr";

import type { ApiResponse } from "@/types/apiResponse";

async function fetcher<TData>(url: string): Promise<TData> {
  const response = await fetch(url);
  const result: ApiResponse<TData> = await response.json();

  if (!response.ok) {
    throw new Error(result.errorMessage);
  }

  return result.data;
}

interface UseGetReturns<TData> {
  data: TData | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

type Query = Record<string, string>;

export function useGet<TData>(
  url: string,
  query?: Query,
): UseGetReturns<TData> {
  const queryString = new URLSearchParams(query).toString();
  const urlWithQueryString = queryString ? `${url}?${queryString}` : url;

  const { data, error, isLoading } = useSWR<TData>(urlWithQueryString, fetcher);

  return { data, error, isLoading };
}
