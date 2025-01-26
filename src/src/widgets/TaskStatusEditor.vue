<script setup lang="ts">
import { reactive } from 'vue'
import { Task, TaskStatus } from '@/stores/Task'
import TaskStatusView from './TaskStatusView.vue'

const props = defineProps<{
  status: TaskStatus
}>()

class State {
  isEditing = false
  status = props.status
  task = new Task()
}

const state = reactive(new State())
</script>

<template>
  <span>
    <TaskStatusView :status="state.status" />
    <select v-model="state.status" name="cars" id="cars">
      <option :value="TaskStatus.ToDo">ToDo</option>
      <option :value="TaskStatus.Doing">Doing</option>
      <option :value="TaskStatus.Done">Done</option>
    </select>
  </span>
</template>
