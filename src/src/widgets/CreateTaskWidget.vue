<script setup lang="ts">
import { reactive } from 'vue'
import { useTaskStore, Task, TaskStatus } from '@/stores/Task'
import StandardButton from '@/styling/StandardButton.vue'

class State {
  task: Task = new Task()
}

const state = reactive(new State())

const taskStore = useTaskStore()

function createTask() {
  taskStore.addCopy(state.task)
  state.task.status = TaskStatus.ToDo
  state.task.name = ''
}
</script>

<template>
  <div>
    <input v-model="state.task.name" />
    <StandardButton label="Create Task" @click="createTask" />
  </div>
</template>
