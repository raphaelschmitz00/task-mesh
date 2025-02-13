import { reactive } from "vue";
import { defineStore } from "pinia";
import { doInObjectStore, get, StoreName, remove, save } from "./db";
import { TaskStatus, useTaskStore, type Task } from "./Task";

export class Requirement {
  id: number = 0;
  readonly requiredTaskId: number;
  readonly dependentTaskId: number;

  constructor(requiredTaskId: number, dependentTaskId: number) {
    this.requiredTaskId = requiredTaskId;
    this.dependentTaskId = dependentTaskId;
  }
}

export class RequirementStore {
  save = (deadline: Requirement) => save(StoreName.requirements, deadline);

  get = (id: number) => get<Requirement>(StoreName.requirements, id);

  remove = (deadline: Requirement) => remove(StoreName.requirements, deadline);
}
export const requirementStore = new RequirementStore();

const requirements = reactive(new Map<number, Requirement>());

export const useRequirementStore = defineStore("Requirements", () => {
  let keyCounter = 1;

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

  return { save, get, getRequiredTasks, getBlockingTasks, query, remove };
});
