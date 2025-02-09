import { useTaskStore, TaskStatus } from "@/stores/Task";
import { Deadline, useDeadlineStore } from "./stores/Deadline";
import { Requirement, useRequirementStore } from "./stores/Requirement";

export default function addDevData() {
  const taskStore = useTaskStore();
  const deadlineStore = useDeadlineStore();
  const requirementStore = useRequirementStore();

  taskStore.addCopy({
    id: 7,
    name: "Do the Dishes",
    status: TaskStatus.ToDo,
  });

  const task8 = taskStore.addCopy({
    id: 8,
    name: "Hang up black laundry",
    status: TaskStatus.ToDo,
  });

  const task9 = taskStore.addCopy({
    id: 9,
    name: "Put in black laundry",
    status: TaskStatus.ToDo,
  });
  requirementStore.save(new Requirement(task8.id, task9.id));

  const task10 = taskStore.addCopy({
    id: 10,
    name: "Hang up white laundry",
    status: TaskStatus.ToDo,
  });
  requirementStore.save(new Requirement(task9.id, task10.id));

  const task11 = taskStore.addCopy({
    id: 11,
    name: "Put in white laundry",
    status: TaskStatus.ToDo,
  });
  requirementStore.save(new Requirement(task10.id, task11.id));
  deadlineStore.save(new Deadline(task11.id, new Date("2030-02-05")));

  const task12 = taskStore.addCopy({
    id: 12,
    name: "Vacuum the floor",
    status: TaskStatus.ToDo,
  });
  deadlineStore.save(new Deadline(task12.id, new Date("2030-02-20")));

  const task13 = taskStore.addCopy({
    id: 13,
    name: "Wipe the floor",
    status: TaskStatus.ToDo,
  });
  requirementStore.save(new Requirement(task12.id, task13.id));
  deadlineStore.save(new Deadline(task13.id, new Date("2030-02-20")));
}
