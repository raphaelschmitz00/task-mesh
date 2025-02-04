<script setup lang="ts">
import { useTaskStore } from "@/stores/Task";
import CreateTaskWidget from "@/widgets/CreateTaskWidget.vue";
import TaskEntryView from "./TaskEntryView.vue";

const taskStore = useTaskStore();
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <div>
      <ul>
        <li v-for="task in taskStore.allTasks" :key="task.key">
          <TaskEntryView :task="task" />
        </li>
      </ul>
    </div>
    <CreateTaskWidget />
  </div>
</template>
