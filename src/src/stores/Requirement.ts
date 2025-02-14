import { get, query, StoreName, remove, save } from "./db";
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

  async query(predicate: (requirement: Requirement) => boolean) {
    return await query(StoreName.requirements, predicate);
  }

  async removeFromTask(dependentTask: Task, requiredTasks: Task[]) {
    const taskIds = requiredTasks.map((x) => x.id);
    const requirements = await query<Requirement>(
      StoreName.requirements,
      (x) =>
        x.dependentTaskId === dependentTask.id &&
        taskIds.includes(x.requiredTaskId),
    );
    for await (const requirement of requirements) {
      await remove(StoreName.requirements, requirement);
    }
  }

  async getRequiredTasks(task: Task) {
    const requirements = await query<Requirement>(
      StoreName.requirements,
      (x) => x.dependentTaskId === task.id,
    );

    const taskStore = useTaskStore();
    return requirements.map((x) => taskStore.get(x.requiredTaskId)!);
  }

  async getBlockingTasks(task: Task) {
    const requiredTasks = await this.getRequiredTasks(task);
    return requiredTasks.filter((x) => x.status !== TaskStatus.Done);
  }
}
export const requirementStore = new RequirementStore();
