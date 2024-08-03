import { http, HttpResponse } from "msw";

import type { Task } from "@/types/task";

type GetTasksParams = Record<string, never>;
type GetTasksRequestBody = Record<string, never>;

type GetTasksResponseBody = {
  tasks: Task[];
};

const allTasks: Task[] = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
];

const get = http.get<
  GetTasksParams,
  GetTasksRequestBody,
  GetTasksResponseBody,
  "/tasks"
>("/tasks", () => {
  return HttpResponse.json({
    tasks: allTasks,
  });
});

type PostTasksParams = Record<string, never>;

type PostTasksRequestBody = {
  title: string;
};

type PostTasksResponseBody = {
  task: Task;
};

const post = http.post<
  PostTasksParams,
  PostTasksRequestBody,
  PostTasksResponseBody,
  "/tasks"
>("/tasks", async ({ request }) => {
  const req = await request.json();

  const sortedTasks = [...allTasks].sort((a, b) => b.id - a.id);

  const task = {
    id: sortedTasks[0].id + 1,
    title: req.title,
  };

  allTasks.push(task);

  return HttpResponse.json({ task: task }, { status: 201 });
});

export const handlers = [get, post];
