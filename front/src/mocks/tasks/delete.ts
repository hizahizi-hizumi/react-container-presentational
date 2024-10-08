import { http, HttpResponse } from "msw";

import type { ApiResponse } from "@/types/apiResponse";
import type { Task } from "@/types/task";
import { deleteTask, getTasks } from ".";
import { ENDPOINT } from "./ENDPOINT";

type DeleteTasksParams = {
  id: string;
};

type DeleteTasksRequestBody = never;

export const delete_ = http.delete<
  DeleteTasksParams,
  DeleteTasksRequestBody,
  ApiResponse<Task | null>,
  string
>(`${ENDPOINT}/:id`, async ({ params }) => {
  // return HttpResponse.error();
  const tasks = getTasks();

  const isTaskExist = tasks.some((task) => task.id === Number(params.id));

  if (!isTaskExist) {
    return HttpResponse.json(
      {
        data: null,
        errorMessage: `Task id ${params.id} is not exists`,
      },
      { status: 404 },
    );
  }

  const index = tasks.findIndex((t) => t.id === Number(params.id));
  const task = tasks[index];

  deleteTask(Number(params.id));

  return HttpResponse.json({ data: task, errorMessage: "" }, { status: 200 });
});
