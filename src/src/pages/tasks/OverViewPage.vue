<script setup lang="ts">
import { useTaskStore, type Task, TaskStatus } from '@/stores/Task'

const taskStore = useTaskStore()

const newee: Task = { key: 3, status: TaskStatus.ToDo, name: 'A Task' }

function createTask() {
  taskStore.addCopy(newee)
}
</script>

<template>
  <div class="about">
    <h1>This is an TaskS page</h1>
    <ul>
      <li v-for="task in taskStore.allTasks" :key="task.key">
        <div># {{ task.key }} - {{ task.name }}</div>
      </li>
    </ul>
    <button @click="createTask">Greet</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
