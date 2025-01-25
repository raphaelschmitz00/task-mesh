<script setup lang="ts">
import { useTaskStore, type Task, TaskStatus } from '@/stores/Task'

const taskStore = useTaskStore()
const tasks = taskStore.getAll()

const newee: Task = { key: 3, status: TaskStatus.ToDo, name: 'A Task' }
taskStore.add(newee)
</script>

<template>
  <div class="about">
    <h1>This is an TaskS page</h1>
    <div v-for="task in tasks" :key="task.key">Name: {{ task.name }}</div>
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
