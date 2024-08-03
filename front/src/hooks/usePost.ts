import type { Arguments } from "swr";
import useSWRMutation from "swr/mutation";

async function fetcher(url: string, { arg }: { arg: Arguments }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  return res.json();
}

interface UsePostParams {
  trigger: (arg: Arguments) => void;
  isMutating: boolean;
}

export function usePost(url: string): UsePostParams {
  const { trigger, isMutating } = useSWRMutation(url, fetcher);

  return { trigger, isMutating };
}
