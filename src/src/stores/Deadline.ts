import { doInObjectStore, get, StoreName, remove, save } from "./db";
import type { Task } from "./Task";

export class Deadline {
  id: number = 0;
  readonly taskId: number;
  date: Date;

  constructor(taskId: number, date: Date) {
    this.taskId = taskId;
    this.date = date;
  }
}

export class DeadlineStore {
  save = (deadline: Deadline) => save(StoreName.deadlines, deadline);

  get = (id: number) => get<Deadline>(StoreName.deadlines, id);

  remove = (deadline: Deadline) => remove(StoreName.deadlines, deadline);

  async getForTask(task: Task) {
    return await doInObjectStore(
      StoreName.deadlines,
      async (store) =>
        new Promise<Deadline>((resolve, reject) => {
          const index = store.index("ix_taskId");
          const request = index.get(task.id);
          request.onerror = reject;
          request.onsuccess = () => resolve(request.result as Deadline);
        }),
    );
  }
}

export const deadlineStore = new DeadlineStore();
