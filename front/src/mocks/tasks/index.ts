import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/tasks", () => {
    return HttpResponse.json([
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ]);
  }),
];
