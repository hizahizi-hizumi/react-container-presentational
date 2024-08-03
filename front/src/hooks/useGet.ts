import useSWR from "swr";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  return res.json();
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
