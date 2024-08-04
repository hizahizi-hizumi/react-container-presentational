import { http, HttpResponse } from "msw";

import type { Task } from "@/types/task";
import { deleteTask, getTasks } from ".";

type DeleteTasksParams = {
  id: string;
};

type DeleteTasksRequestBody = Record<string, never>;

type DeleteTasksResponseBody = {
  data: Task | null;
  message: string;
};

export const delete_ = http.delete<
  DeleteTasksParams,
  DeleteTasksRequestBody,
  DeleteTasksResponseBody,
  "/tasks/:id"
>("/tasks/:id", async ({ params }) => {
  // return HttpResponse.error();
  const tasks = getTasks();

  const isTaskExist = tasks.some((task) => task.id === Number(params.id));

  if (!isTaskExist) {
    return HttpResponse.json(
      {
        data: null,
        message: `Task id ${params.id} is not exists`,
      },
      { status: 404 },
    );
  }

  deleteTask(Number(params.id));

  const index = tasks.findIndex((t) => t.id === Number(params.id));
  const task = tasks[index];

  return HttpResponse.json({ data: task, message: "" }, { status: 200 });
});
