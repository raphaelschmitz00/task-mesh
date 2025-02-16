import { deadlineStore } from "@/stores/Deadline";
import { requirementStore } from "@/stores/Requirement";
import { type Task } from "@/stores/Task";

export type DateGroup = { date?: Date; tasks: Task[] };

async function getTasksWithOwnEndDate(
  tasks: Task[],
): Promise<Map<Date, Task[]>> {
  const tasksByEndDate = new Map<Date, Task[]>();
  for (const task of tasks) {
    const deadline = await deadlineStore.getForTask(task);
    if (!deadline) continue;

    if (!tasksByEndDate.has(deadline.date)) {
      tasksByEndDate.set(deadline.date, []);
    }

    const tasksForDate = tasksByEndDate.get(deadline.date)!;
    tasksForDate.push(task);
  }

  return tasksByEndDate;
}

function compareDates(a: Date, b: Date) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export default async function sortTasksIntoDateGroups(
  tasks: Task[],
): Promise<DateGroup[]> {
  const tasksByEndDate = await getTasksWithOwnEndDate(tasks);
  const sortedDates = [...tasksByEndDate.keys()].sort(compareDates);
  const remainingTasks = [...tasks];

  for (const date of sortedDates) {
    const tasksForDate = tasksByEndDate.get(date)!;
    const tasksToProcess = [...tasksForDate];

    while (tasksToProcess.length) {
      const task = tasksToProcess.pop()!;

      const index = remainingTasks.indexOf(task);
      remainingTasks.splice(index, 1);

      if (!tasksForDate.includes(task)) {
        tasksForDate.push(task);
      }

      const requirements = await requirementStore.getRequiredTasks(task);

      requirements.forEach((x) => tasksToProcess.push(x));
    }
  }

  const result = new Array<DateGroup>();
  tasksByEndDate.forEach((tasks, date) => result.push({ date, tasks }));
  result.push({ tasks: remainingTasks });

  return result;
}
