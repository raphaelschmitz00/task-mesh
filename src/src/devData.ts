import { useTaskStore, TaskStatus } from "@/stores/Task";
import { Deadline, useDeadlineStore } from "./stores/Deadline";

export default function addDevData() {
  const taskStore = useTaskStore();
  const deadlineStore = useDeadlineStore();

  taskStore.addCopy({
    id: 7,
    name: "Do the Dishes",
    status: TaskStatus.ToDo,
    dependsOn: [],
  });

  const task8 = taskStore.addCopy({
    id: 8,
    name: "Hang up black laundry",
    status: TaskStatus.ToDo,
    dependsOn: [],
  });

  const task9 = taskStore.addCopy({
    id: 9,
    name: "Put in black laundry",
    status: TaskStatus.ToDo,
    dependsOn: [task8.id],
  });

  const task10 = taskStore.addCopy({
    id: 10,
    name: "Hang up white laundry",
    status: TaskStatus.ToDo,
    dependsOn: [task9.id],
  });

  const task11 = taskStore.addCopy({
    id: 11,
    name: "Put in white laundry",
    status: TaskStatus.ToDo,
    dependsOn: [task10.id],
  });
  deadlineStore.save(new Deadline(task11.id, new Date("2030-02-05")));

  const task12 = taskStore.addCopy({
    id: 12,
    name: "Vacuum the floor",
    status: TaskStatus.ToDo,
    dependsOn: [],
  });
  deadlineStore.save(new Deadline(task12.id, new Date("2030-02-20")));

  const task13 = taskStore.addCopy({
    id: 13,
    name: "Wipe the floor",
    status: TaskStatus.ToDo,
    dependsOn: [task12.id],
  });
  deadlineStore.save(new Deadline(task13.id, new Date("2030-02-20")));
}
