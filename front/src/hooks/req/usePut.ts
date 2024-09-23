import { useState } from "react";
import { mutate } from "swr";

import type { ApiResponse } from "@/types/apiResponse";
import type { idData } from "@/types/idData";

async function putData<TParams, TData>(
  url: string,
  id: number,
  params: TParams,
): Promise<TData> {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
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

interface UsePutReturns<TParams, TData> {
  put: (id: number, params: TParams) => Promise<void>;
  data: TData | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export function usePut<TParams, TData extends idData>(
  url: string,
): UsePutReturns<TParams, TData> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  async function put(id: number, params: TParams) {
    setIsLoading(true);
    setError(undefined);

    try {
      const updatedData = await putData<TParams, TData>(url, id, params);
      setData(updatedData);

      mutate(url, (currentData: TData[] | undefined) => {
        if (!currentData) {
          return [];
        }

        return currentData.map((item) =>
          item.id === updatedData.id ? updatedData : item,
        );
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { put, data, isLoading, error };
}
