import { http, HttpResponse } from "msw";

import type { Task } from "@/types/task";

type GetTasksParams = Record<string, never>;
type GetTasksRequestBody = Record<string, never>;

type GetTasksResponseBody = {
  tasks: Task[];
};

export const handlers = [
  http.get<GetTasksParams, GetTasksRequestBody, GetTasksResponseBody, "/tasks">(
    "/tasks",
    () => {
      return HttpResponse.json({
        tasks: [
          { id: 1, title: "Task 1" },
          { id: 2, title: "Task 2" },
        ],
      });
    },
  ),
];
