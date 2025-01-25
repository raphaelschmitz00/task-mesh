<script setup lang="ts">
import { useTaskStore } from '@/stores/Task'
import CreateTaskWidget from '@/widgets/CreateTaskWidget.vue'
import TaskEntryView from './TaskEntryView.vue'

const taskStore = useTaskStore()
</script>

<template>
  <div class="tassks">
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

<style>
@media (min-width: 1024px) {
  .tasks {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
