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

const request = indexedDB.open("task_mesh_db");
request.onupgradeneeded = () => {
  const db = request.result;
  const store = db.createObjectStore("mystore", { keyPath: "id" });
  store.createIndex("branch_db", ["branch"], { unique: false });
};
request.onsuccess = function () {
  console.log("database opened successfully");
  const db = request.result;
  const transaction = db.transaction("mystore", "readwrite");
  const store = transaction.objectStore("mystore");
  const branchIndex = store.index("branch_db");
  store.put({ id: 1, name: "jason", branch: "IT" });
  store.put({ id: 2, name: "praneeth", branch: "CSE" });
  store.put({ id: 3, name: "palli", branch: "EEE" });
  store.put({ id: 4, name: "abdul", branch: "IT" });
  store.put({ id: 4, name: "deevana", branch: "CSE" });
  const req = branchIndex.getAll(["CSE"]);
  req.onsuccess = function () {
    console.log("onsuccess");
    if (req.result !== undefined) {
      console.log("bots", req.result);
    } else {
      console.log("There are no such bots");
    }
  };
  req.onerror = (e) => {
    console.log("onerror", e);
  };
  transaction.oncomplete = function () {
    console.log("oncomplete");
    db.close();
  };
};

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
