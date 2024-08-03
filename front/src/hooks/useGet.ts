import useSWR from "swr";

async function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

export function useGet<T>(url: string): {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
} {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);

  return { data, error, isLoading };
}
