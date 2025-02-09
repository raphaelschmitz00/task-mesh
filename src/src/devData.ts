import { useTaskStore, Task } from "@/stores/Task";
import { Deadline, useDeadlineStore } from "./stores/Deadline";
import { Requirement, useRequirementStore } from "./stores/Requirement";

export default function addDevData() {
  const taskStore = useTaskStore();
  const deadlineStore = useDeadlineStore();
  const requirementStore = useRequirementStore();

  const task1 = new Task("Do the Dishes");
  taskStore.save(task1);

  const task8 = new Task("Hang up black laundry");
  taskStore.save(task8);

  const task9 = new Task("Put in black laundry");
  taskStore.save(task9);
  requirementStore.save(new Requirement(task8.id, task9.id));

  const task10 = new Task("Hang up white laundry");
  taskStore.save(task10);
  requirementStore.save(new Requirement(task9.id, task10.id));

  const task11 = new Task("Put in white laundry");
  taskStore.save(task11);
  requirementStore.save(new Requirement(task10.id, task11.id));
  deadlineStore.save(new Deadline(task11.id, new Date("2030-02-05")));

  const task12 = new Task("Vacuum the floor");
  taskStore.save(task12);
  deadlineStore.save(new Deadline(task12.id, new Date("2030-02-20")));

  const task13 = new Task("Wipe the floor");
  taskStore.save(task13);
  requirementStore.save(new Requirement(task12.id, task13.id));
  deadlineStore.save(new Deadline(task13.id, new Date("2030-02-20")));
}
