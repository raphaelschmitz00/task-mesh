import { Task, taskStore } from "@/stores/Task";
import { Deadline, deadlineStore } from "@/stores/Deadline";
import { Requirement, requirementStore } from "@/stores/Requirement";

async function addDevData() {
  const task1 = new Task("Do the Dishes");
  await taskStore.save(task1);

  const task8 = new Task("Hang up black laundry");
  await taskStore.save(task8);

  const task9 = new Task("Put in black laundry");
  await taskStore.save(task9);
  await requirementStore.save(new Requirement(task8.id, task9.id));

  const task10 = new Task("Hang up white laundry");
  await taskStore.save(task10);
  await requirementStore.save(new Requirement(task9.id, task10.id));

  const task11 = new Task("Put in white laundry");
  await taskStore.save(task11);
  await requirementStore.save(new Requirement(task10.id, task11.id));
  await deadlineStore.save(new Deadline(task11.id, new Date("2030-02-05")));

  const task12 = new Task("Vacuum the floor");
  await taskStore.save(task12);
  await deadlineStore.save(new Deadline(task12.id, new Date("2030-02-20")));

  const task13 = new Task("Wipe the floor");
  await taskStore.save(task13);
  await requirementStore.save(new Requirement(task12.id, task13.id));
  await deadlineStore.save(new Deadline(task13.id, new Date("2030-02-20")));
}

addDevData();
