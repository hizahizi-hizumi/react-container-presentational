import { http, HttpResponse } from "msw";

import type { Task } from "@/types/task";
import { addTask, getTasks } from ".";

type PostTasksParams = Record<string, never>;

type PostTasksRequestBody = {
  title: string;
};

type PostTasksResponseBody = {
  data: Task | null;
  message: string;
};

export const post = http.post<
  PostTasksParams,
  PostTasksRequestBody,
  PostTasksResponseBody,
  "/tasks"
>("/tasks", async ({ request }) => {
  // return HttpResponse.error();
  const req = await request.json();

  const taskTitles = getTasks().map((task) => task.title);
  const isParamsValid = taskTitles.includes(req.title);

  if (isParamsValid) {
    return HttpResponse.json(
      {
        data: null,
        message: `Task with title "${req.title}" already exists`,
      },
      { status: 400 },
    );
  }

  const sortedTasks = [...getTasks()].sort((a, b) => b.id - a.id);

  const task = {
    id: sortedTasks[0].id + 1,
    title: req.title,
  };

  addTask(task);

  return HttpResponse.json({ data: task, message: "" }, { status: 201 });
});
