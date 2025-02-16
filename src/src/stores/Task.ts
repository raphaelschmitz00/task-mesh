import { get, query, StoreName, remove, save } from "./db";

export enum TaskStatus {
  ToDo,
  Doing,
  Done,
}

export const allTaskStatuses = [
  TaskStatus.ToDo,
  TaskStatus.Doing,
  TaskStatus.Done,
];

export function getTaskStatusName(status: TaskStatus) {
  if (status === TaskStatus.ToDo) return "To Do";
  if (status === TaskStatus.Doing) return "Doing";
  if (status === TaskStatus.Done) return "Done";
  throw new Error(`Task Status unrecognized: ${status}`);
}

export class Task {
  id: number = 0;
  name: string = "";
  status: TaskStatus = TaskStatus.ToDo;

  constructor(name: string, status: TaskStatus = TaskStatus.ToDo) {
    this.name = name;
    this.status = status;
  }
}

export class TaskStore {
  save = (deadline: Task) => save(StoreName.tasks, deadline);

  get = (id: number) => get<Task>(StoreName.tasks, id);

  query = (predicate: (task: Task) => boolean, maxResults?: number) =>
    query<Task>(StoreName.tasks, predicate, maxResults);

  remove = (deadline: Task) => remove(StoreName.tasks, deadline);
}
export const taskStore = new TaskStore();
