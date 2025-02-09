import { reactive } from "vue";
import { defineStore } from "pinia";
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

const deadlines = reactive(new Map<number, Deadline>());

export const useDeadlineStore = defineStore("Deadlines", () => {
  let keyCounter = 1;

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
