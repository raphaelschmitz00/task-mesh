import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Task } from "./Task";
import initializeDb from "./db";

export class Deadline {
  id: number = 0;
  readonly taskId: number;
  date: Date;

  constructor(taskId: number, date: Date) {
    this.taskId = taskId;
    this.date = date;
  }
}

const db = initializeDb();

const deadlines = reactive(new Map<number, Deadline>());

export const useDeadlineStore = defineStore("Deadlines", () => {
  let keyCounter = 7;

  function save(deadline: Deadline) {
    deadline.id ||= keyCounter++;

    const transaction = db.transaction("deadlines", "readwrite");
    const store = transaction.objectStore("deadlines");
    const f = store.add(deadline);
    console.log("autooo", f);
    f.onsuccess = () => console.log("auto2", f.result);
    f.onerror = () => console.log("autooo 3", f.result);

    deadlines.set(deadline.id, deadline);
  }

  function get(id: number) {
    return deadlines.get(id);
  }

  function remove(deadline: Deadline) {
    deadlines.delete(deadline.id);
  }

  function getForTask(task: Task) {
    return Array.from(deadlines.values()).find((x) => x.taskId === task.id);
  }

  return { save, get, remove, getForTask };
});
