import { http, HttpResponse } from "msw";

import type { Task } from "@/types/task";
import { getTasks } from "./";

type GetTasksParams = Record<string, never>;
type GetTasksRequestBody = Record<string, never>;

type GetTasksResponseBody = {
  data: Task[];
  message: string;
};

export const get = http.get<
  GetTasksParams,
  GetTasksRequestBody,
  GetTasksResponseBody,
  "/tasks"
>("/tasks", () => {
  return HttpResponse.json({
    data: getTasks(),
    message: "",
  });
});
