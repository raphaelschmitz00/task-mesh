import { type Task } from "@/stores/Task";

export class DateGroup {
  deadline?: Date;
  tasks: Task[];
  constructor(deadline?: Date, tasks: Task[] = []) {
    this.deadline = deadline;
    this.tasks = tasks;
  }
}

function groupByDeadline(data: Array<Task>) {
  return data.reduce(function (dateGroups, task) {
    let dateGroup = dateGroups.find((x) => x.deadline === task.deadline);
    if (!dateGroup) {
      dateGroup = new DateGroup(task.deadline);
      dateGroups.push(dateGroup);
    }

    dateGroup.tasks.push(task);

    return dateGroups;
  }, new Array<DateGroup>());
}

export default function sortTasksIntoDateGroups(tasks: Task[]) {
  const tasksWithDeadline = tasks.filter((x) => x.deadline);

  const dateGroups = groupByDeadline(tasksWithDeadline);

  dateGroups.sort((a, b) => {
    if (a.deadline! < b.deadline!) return -1;
    if (a.deadline! > b.deadline!) return 1;
    return 0;
  });

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
        const requiredTask = remainingTasks.find((x) => x.id === id)!;
        tasksToProcess.push(requiredTask);
      }
    }
  }

  dateGroups.push(new DateGroup(undefined, [...remainingTasks]));

  return dateGroups;
}
