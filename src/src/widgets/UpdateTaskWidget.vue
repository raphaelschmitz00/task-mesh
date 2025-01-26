<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useTaskStore, Task } from '@/stores/Task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  updated: []
}>()

class State {
  task: Task = { ...props.task }
}

const state = reactive(new State())
const taskStore = useTaskStore()

watch(props, (newProps) => {
  state.task = newProps.task
})

function updateTask() {
  taskStore.update(state.task)
  emit('updated')
  console.log(`updated ${JSON.stringify(state.task)}`)
}
</script>

<template>
  <input v-model="state.task.name" @keyup.enter="updateTask" />
</template>
