import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Task } from "./Task";
import { setUpDbAsync, doInDb } from "./db";

export class Deadline {
  id: number = 0;
  readonly taskId: number;
  date: Date;

  constructor(taskId: number, date: Date) {
    this.taskId = taskId;
    this.date = date;
  }
}

function removeProperty<T, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  void _;
  return rest;
}

export class DeadlineStore {
  async save(deadline: Deadline) {
    await doInDb(async (db) => {
      const transaction = db.transaction("deadlines", "readwrite");
      const store = transaction.objectStore("deadlines");

      const storableDeadline = removeProperty(deadline, "id");
      const request = store.add(storableDeadline);
      request.onsuccess = () => (deadline.id = request.result as number);
      request.onerror = console.log;
    });
  }
}

export const deadlineStore = new DeadlineStore();

const deadlines = reactive(new Map<number, Deadline>());

export const useDeadlineStore = defineStore("Deadlines", () => {
  let keyCounter = 7;

  function save(deadline: Deadline) {
    deadline.id ||= keyCounter++;

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
