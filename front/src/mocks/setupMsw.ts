import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export async function setupMsw() {
  if (!import.meta.env.DEV) {
    return;
  }

  const worker = setupWorker(...handlers);
  await worker.start();
}
