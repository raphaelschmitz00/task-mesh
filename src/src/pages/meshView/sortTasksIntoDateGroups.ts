import { type Deadline, useDeadlineStore } from "@/stores/Deadline";
import { type Task } from "@/stores/Task";

const deadlineStore = useDeadlineStore();

export class DateGroup {
  deadline?: Deadline;
  tasks: Task[];
  constructor(deadline?: Deadline, tasks: Task[] = []) {
    this.deadline = deadline;
    this.tasks = tasks;
  }
}

function groupByDeadline(data: Array<Task>) {
  return data.reduce(function (dateGroups, task) {
    const deadline = deadlineStore.getForTask(task);

    let dateGroup = dateGroups.find(
      (x) => x.deadline?.date.getTime() === deadline?.date.getTime(),
    );

    if (!dateGroup) {
      dateGroup = new DateGroup(deadline);
      dateGroups.push(dateGroup);
    }

    dateGroup.tasks.push(task);

    return dateGroups;
  }, new Array<DateGroup>());
}

function sortByDeadline(a: DateGroup, b: DateGroup) {
  if (a.deadline! < b.deadline!) return -1;
  if (a.deadline! > b.deadline!) return 1;
  return 0;
}

export default function sortTasksIntoDateGroups(tasks: Task[]) {
  const tasksWithDeadline = tasks.filter((x) => deadlineStore.getForTask(x));

  const dateGroups = groupByDeadline(tasksWithDeadline);
  dateGroups.sort(sortByDeadline);

  const remainingTasks = [...tasks];
  for (const group of dateGroups) {
    const tasksToProcess = [...group.tasks];
    while (tasksToProcess.length) {
      const task = tasksToProcess.pop()!;
      if (remainingTasks.includes(task)) {
        const index = remainingTasks.indexOf(task);
        remainingTasks.splice(index, 1);
      }

      if (!group.tasks.includes(task)) {
        group.tasks.push(task);
      }

      for (const id of task.dependsOn) {
        const requiredTask = remainingTasks.find((x) => x.id === id);
        if (!requiredTask) continue;

        tasksToProcess.push(requiredTask);
      }
    }
  }

  dateGroups.push(new DateGroup(undefined, [...remainingTasks]));

  return dateGroups;
}
