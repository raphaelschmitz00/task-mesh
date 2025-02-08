import { computed, reactive } from "vue";
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
  deadline?: Date;
  dependsOn: number[] = [];
}

const tasks = reactive(new Map<number, Task>());

export const useTaskStore = defineStore("Tasks", () => {
  let keyCounter = 0;

  const allTasks = computed(() => Array.from(tasks, ([, value]) => value));

  function addCopy(task: Task) {
    const id = keyCounter++;
    const newTask: Task = {
      id: id,
      status: task.status,
      name: task.name,
      dependsOn: [...task.dependsOn],
    };

    tasks.set(id, newTask);
    return newTask;
  }

  function get(id: number) {
    return tasks.get(id);
  }

  function update(task: Task) {
    const storedTask = tasks.get(task.id);
    tasks.set(task.id, { ...storedTask, ...task });
  }

  function remove(task: Task) {
    tasks.delete(task.id);
  }

  function getBlockingTasks(task: Task) {
    return allTasks.value.filter(
      (x) => task.dependsOn.includes(x.id) && x.status !== TaskStatus.Done,
    );
  }

  return { addCopy, get, allTasks, update, remove, getBlockingTasks };
});
