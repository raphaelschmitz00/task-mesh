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
  id: number = -1;
  name: string = "";
  status: TaskStatus = TaskStatus.ToDo;
}

const tasks = reactive(new Map<number, Task>());

export const useTaskStore = defineStore("Tasks", () => {
  let keyCounter = 0;

  function addCopy(task: Task) {
    const id = keyCounter++;
    const newTask: Task = {
      id: id,
      status: task.status,
      name: task.name,
    };

    tasks.set(id, newTask);
    return newTask;
  }

  function get(id: number) {
    if (!tasks.has(id)) throw new Error(`No task wth ID ${id}`);
    return tasks.get(id);
  }

  function query(predicate: (task: Task) => boolean = () => true) {
    return Array.from(tasks.values()).filter(predicate);
  }

  function update(task: Task) {
    const storedTask = tasks.get(task.id);
    tasks.set(task.id, { ...storedTask, ...task });
  }

  function remove(task: Task) {
    tasks.delete(task.id);
  }

  return { addCopy, get, query, update, remove };
});
