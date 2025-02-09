import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { TaskStatus, useTaskStore, type Task } from "./Task";

export class Requirement {
  static readonly NotSavedId = 0;

  id: number = Requirement.NotSavedId;
  readonly requiredTaskId: number;
  readonly dependentTaskId: number;

  constructor(requiredTaskId: number, dependentTaskId: number) {
    this.requiredTaskId = requiredTaskId;
    this.dependentTaskId = dependentTaskId;
  }
}

const requirements = reactive(new Map<number, Requirement>());

export const useRequirementStore = defineStore("Requirements", () => {
  let keyCounter = 0;

  const all = computed(() => Array.from(requirements.values()));

  function save(requirement: Requirement) {
    requirement.id ||= keyCounter++;
    requirements.set(requirement.id, requirement);
  }

  function get(id: number) {
    return requirements.get(id);
  }

  function query(predicate: (requirement: Requirement) => boolean) {
    return Array.from(requirements.values()).filter(predicate);
  }

  function getRequiredTasks(task: Task) {
    const taskStore = useTaskStore();
    return Array.from(requirements.values())
      .filter((x) => x.dependentTaskId === task.id)
      .map((x) => taskStore.get(x.requiredTaskId)!);
  }

  function getBlockingTasks(task: Task) {
    return getRequiredTasks(task).filter((x) => x.status !== TaskStatus.Done);
  }

  function remove(requirement: Requirement) {
    requirements.delete(requirement.id);
  }

  return { all, save, get, getRequiredTasks, getBlockingTasks, query, remove };
});
