import { reactive } from "vue";
import { defineStore } from "pinia";

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

const tasks = reactive(new Map<number, Task>());

export const useTaskStore = defineStore("Tasks", () => {
  let keyCounter = 1;

  function save(task: Task) {
    task.id ||= keyCounter++;
    tasks.set(task.id, task);
  }

  function get(id: number) {
    if (!tasks.has(id)) throw new Error(`No task wth ID ${id}`);
    return tasks.get(id);
  }

  function query(predicate: (task: Task) => boolean = () => true) {
    return Array.from(tasks.values()).filter(predicate);
  }

  function remove(task: Task) {
    tasks.delete(task.id);
  }

  return { save, get, query, remove };
});
