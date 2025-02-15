import { type Deadline, deadlineStore } from "@/stores/Deadline";
import { requirementStore } from "@/stores/Requirement";
import { type Task } from "@/stores/Task";

export class DateGroup {
  deadline?: Deadline;
  tasks: Task[];
  constructor(deadline?: Deadline, tasks: Task[] = []) {
    this.deadline = deadline;
    this.tasks = tasks;
  }
}

type GroupData = { task: Task; deadline?: Deadline };

async function groupByDeadline(data: Array<Task>) {
  const groupDatas = new Array<GroupData>();
  for await (const task of data) {
    const deadline = await deadlineStore.getForTask(task);
    groupDatas.push({ task, deadline });
  }

  return groupDatas.reduce(function (dateGroups, groupData) {
    const deadline = groupData.deadline;

    let dateGroup = dateGroups.find(
      (x) => x.deadline?.date.getTime() === deadline?.date.getTime(),
    );

    if (!dateGroup) {
      dateGroup = new DateGroup(deadline);
      dateGroups.push(dateGroup);
    }

    dateGroup.tasks.push(groupData.task);

    return dateGroups;
  }, new Array<DateGroup>());
}

function sortByDeadline(a: DateGroup, b: DateGroup) {
  if (a.deadline! < b.deadline!) return -1;
  if (a.deadline! > b.deadline!) return 1;
  return 0;
}

export default async function sortTasksIntoDateGroups(tasks: Task[]) {
  const tasksWithDeadline = tasks.filter((x) => deadlineStore.getForTask(x));

  const dateGroups = await groupByDeadline(tasksWithDeadline);
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

      const requirements = await requirementStore.getRequiredTasks(task);

      requirements
        .filter((x) => remainingTasks.includes(x))
        .forEach((x) => tasksToProcess.push(x));
    }
  }

  dateGroups.push(new DateGroup(undefined, [...remainingTasks]));

  return dateGroups;
}
