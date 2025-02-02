<script setup lang="ts">
import { reactive } from 'vue'
import { useTaskStore, Task, TaskStatus } from '@/stores/Task'
import StandardButton from '@/styling/StandardButton.vue'
import StandardInput from '@/styling/StandardInput.vue'
import StandardCard from '@/styling/StandardCard.vue'

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
  <StandardCard class="createTaskWidget">
    <StandardInput v-model="state.task.name" @on-enter="createTask" />
    <StandardButton label="Create Task" @click="createTask" />
  </StandardCard>
</template>

<style lang="css" scoped>
.createTaskWidget {
  max-width: 300px;
}
</style>
