<script setup lang="ts">
import { reactive } from 'vue'
import { Task, TaskStatus } from '@/stores/Task'
import TaskStatusView from './TaskStatusView.vue'

const props = defineProps<{
  status: TaskStatus
}>()

const emit = defineEmits<{
  changed: [status: TaskStatus]
}>()

class State {
  isEditing = false
  status = props.status
  task = new Task()
}

const state = reactive(new State())

function updateState(event: Event) {
  const select = event.target as HTMLSelectElement
  const newStatus = parseInt(select.value) as TaskStatus
  emit('changed', newStatus)
}
</script>

<template>
  <span>
    <TaskStatusView :status="state.status" />
    <select v-model="state.status" @change="updateState" name="cars" id="cars">
      <option :value="TaskStatus.ToDo">ToDo</option>
      <option :value="TaskStatus.Doing">Doing</option>
      <option :value="TaskStatus.Done">Done</option>
    </select>
  </span>
</template>
