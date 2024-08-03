import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export function setupMsw() {
  if (!import.meta.env.DEV) {
    return;
  }

  const worker = setupWorker(...handlers);
  worker.start();
}
