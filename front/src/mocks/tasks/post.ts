import { http, HttpResponse } from "msw";

import type { ApiResponse } from "@/types/apiResponse";
import type { Task } from "@/types/task";
import { addTask, getTasks } from ".";

type PostTasksParams = never;

type PostTasksRequestBody = {
  title: string;
};

export const post = http.post<
  PostTasksParams,
  PostTasksRequestBody,
  ApiResponse<Task | null>,
  "/tasks"
>("/tasks", async ({ request }) => {
  // return HttpResponse.error();
  const req = await request.json();

  const existedTasks = getTasks();

  const taskTitles = existedTasks.map((task) => task.title);
  const isParamsValid = taskTitles.includes(req.title);

  if (isParamsValid) {
    return HttpResponse.json(
      {
        data: null,
        errorMessage: `Task with title "${req.title}" already exists`,
      },
      { status: 400 },
    );
  }

  let sortedTasks: Task[] = [];
  let id = 1;

  if (existedTasks.length > 0) {
    sortedTasks = [...existedTasks].sort((a, b) => b.id - a.id);
    id = sortedTasks[0].id + 1;
  }

  const task = {
    id: id,
    title: req.title,
  };

  addTask(task);

  return HttpResponse.json({ data: task, errorMessage: "" }, { status: 201 });
});
