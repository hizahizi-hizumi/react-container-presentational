import { http, HttpResponse } from "msw";

import type { ApiResponse } from "@/types/apiResponse";
import type { Task } from "@/types/task";
import { getTasks } from "./";
import { ENDPOINT } from "./ENDPOINT";

type GetTasksParams = never;
type GetTasksRequestBody = never;

export const get = http.get<
  GetTasksParams,
  GetTasksRequestBody,
  ApiResponse<Task[]>,
  string
>(ENDPOINT, () => {
  return HttpResponse.json({
    data: getTasks(),
    errorMessage: "",
  });
});
