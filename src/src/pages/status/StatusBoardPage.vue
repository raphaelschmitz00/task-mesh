<script setup lang="ts">
import { taskStore, type Task, TaskStatus } from "@/stores/Task";
import CreateTaskWidget from "@/widgets/CreateTaskWidget.vue";
import TaskEntryView from "./TaskEntryView.vue";
import { computed, reactive } from "vue";

class State {
  tasks = new Array<Task>();
}
const state = reactive(new State());

function fetch() {
  taskStore.query(() => true).then((x) => (state.tasks = x));
}
fetch();

const getWithStatus = (status: TaskStatus) =>
  state.tasks.filter((x) => x.status === status);

const todos = computed(() => getWithStatus(TaskStatus.ToDo));
const doings = computed(() => getWithStatus(TaskStatus.Doing));
const dones = computed(() => getWithStatus(TaskStatus.Done));
</script>

<template>
  <div>
    <h1>Status Board</h1>
    <div>
      <div class="taskColumnHeader">To Do</div>
      <div class="taskColumnHeader">Doing</div>
      <div class="taskColumnHeader">Done</div>
    </div>
    <div>
      <div class="taskColumn">
        <TaskEntryView v-for="task in todos" :key="task.id" :task="task" />
      </div>
      <div class="taskColumn">
        <TaskEntryView v-for="task in doings" :key="task.id" :task="task" />
      </div>
      <div class="taskColumn">
        <TaskEntryView v-for="task in dones" :key="task.id" :task="task" />
      </div>
    </div>
    <CreateTaskWidget @created="fetch" />
  </div>
</template>

<style scoped>
.taskColumnHeader {
  display: inline-block;
  width: 33%;
  text-align: center;
}
.taskColumn {
  display: inline-block;
  width: 33%;
}
</style>
