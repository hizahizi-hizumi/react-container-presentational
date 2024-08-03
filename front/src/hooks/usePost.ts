import type { Arguments } from "swr";
import useSWRMutation from "swr/mutation";

async function fetcher(url: string, { arg }: { arg: Arguments }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}

interface UsePostParams {
  trigger: (arg: Arguments) => void;
  isMutating: boolean;
  error: Error | null;
}

export function usePost(url: string): UsePostParams {
  const { trigger, isMutating, error } = useSWRMutation(url, fetcher);

  return { trigger, isMutating, error };
}
