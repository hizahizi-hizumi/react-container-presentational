import { useState } from "react";
import { mutate } from "swr";

import type { ApiResponse } from "@/types/apiResponse";
import type { idData } from "@/types/idData";

async function deleteData<TData>(url: string, id: number): Promise<TData> {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<TData> = await response.json();

  if (!response.ok) {
    throw new Error(result.errorMessage);
  }

  return result.data;
}

interface UseDeleteReturns<TData> {
  delete: (id: number) => Promise<void>;
  data: TData | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export function useDelete<TData extends idData>(
  url: string,
): UseDeleteReturns<TData> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  async function delete_(id: number) {
    setIsLoading(true);
    setError(undefined);

    try {
      const deletedData = await deleteData<TData>(url, id);
      setData(deletedData);

      mutate(url, (currentData: TData[] | undefined) => {
        if (!currentData) {
          return [];
        }

        return currentData.filter((item) => item.id !== deletedData.id);
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { delete: delete_, data, isLoading, error };
}
