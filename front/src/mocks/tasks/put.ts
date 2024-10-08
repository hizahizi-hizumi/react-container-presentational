import { http, HttpResponse } from "msw";

import type { ApiResponse } from "@/types/apiResponse";
import type { Task } from "@/types/task";
import { getTasks, updateTask } from ".";
import { ENDPOINT } from "./ENDPOINT";

type PutTasksParams = {
  id: string;
};

type PutTasksRequestBody = {
  title: string;
};

export const put = http.put<
  PutTasksParams,
  PutTasksRequestBody,
  ApiResponse<Task | null>,
  string
>(`${ENDPOINT}/:id`, async ({ params, request }) => {
  // return HttpResponse.error();
  const req = await request.json();

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

  const taskTitles = tasks.map((task) => task.title);
  const isParamsInvalid = taskTitles.includes(req.title);

  if (isParamsInvalid) {
    return HttpResponse.json(
      {
        data: null,
        errorMessage: `Task with title "${req.title}" already exists`,
      },
      { status: 400 },
    );
  }

  const task = {
    id: Number(params.id),
    title: req.title,
  };

  updateTask(task);

  return HttpResponse.json({ data: task, errorMessage: "" }, { status: 200 });
});
