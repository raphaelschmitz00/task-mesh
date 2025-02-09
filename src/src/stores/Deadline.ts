import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { Task } from "./Task";

export class Deadline {
  static readonly NotSavedId = -1;

  id: number = Deadline.NotSavedId;
  readonly taskId: number;
  date: Date;

  constructor(taskId: number, date: Date) {
    this.taskId = taskId;
    this.date = date;
  }
}

const deadlines = reactive(new Map<number, Deadline>());

export const useDeadlineStore = defineStore("Deadlines", () => {
  let keyCounter = 0;

  const allDeadlines = computed(() =>
    Array.from(deadlines, ([, value]) => value),
  );

  function save(deadline: Deadline) {
    if (deadline.id === Deadline.NotSavedId) {
      deadline.id = keyCounter++;
    }

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

  return { allDeadlines, save, get, remove, getForTask };
});
