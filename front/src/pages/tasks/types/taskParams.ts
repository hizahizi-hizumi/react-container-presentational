import type { Task } from "@/types/task";

export type TaskParams = Omit<Task, "id">;
