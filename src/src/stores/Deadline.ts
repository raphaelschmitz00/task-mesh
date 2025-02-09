import { computed, reactive } from "vue";
import { defineStore } from "pinia";

export class Deadline {
  static readonly NotSavedId = -1;

  id: number = Deadline.NotSavedId;
  readonly taskId: number;
  readonly date: Date;

  constructor(taskId: number, date: Date) {
    this.taskId = taskId;
    this.date = date;
  }
}

const deadlines = reactive(new Map<number, Deadline>());

export const useTaskStore = defineStore("Deadlines", () => {
  let keyCounter = 0;

  const allDeadlines = computed(() =>
    Array.from(deadlines, ([, value]) => value),
  );

  function saveNew(deadline: Deadline) {
    if (deadline.id === Deadline.NotSavedId) {
      throw new Error(
        `Trying to store Deadline already stored with ID ${deadline.id}`,
      );
    }

    deadline.id = keyCounter++;
    deadlines.set(deadline.id, deadline);
  }

  function get(id: number) {
    return deadlines.get(id);
  }

  function remove(deadline: Deadline) {
    deadlines.delete(deadline.id);
  }

  return { allDeadlines, saveNew, get, remove };
});
