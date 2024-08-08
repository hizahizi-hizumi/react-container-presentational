import useSWR from "swr";

import type { ApiResponse } from "@/types/apiResponse";

type Query = Record<string, string>;

interface FetcherParams {
  url: string;
  query?: Query;
}

async function fetcher<T>(params: FetcherParams): Promise<T> {
  const { url, query } = params;

  const queryString = new URLSearchParams(query).toString();
  const urlWithQueryString = queryString ? `${url}?${queryString}` : url;

  const response = await fetch(urlWithQueryString);
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

export function useGet<T>(url: string, query?: Query): UseGetReturns<T> {
  const { data, error, isLoading } = useSWR<T, Error, FetcherParams>(
    { url, query },
    fetcher,
  );

  return { data, error, isLoading };
}
