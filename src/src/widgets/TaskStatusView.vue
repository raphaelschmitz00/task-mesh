<script setup lang="ts">
import { TaskStatus } from '@/stores/Task'

const props = defineProps<{
  status: TaskStatus
}>()

function getDisplay(taskStatus: TaskStatus) {
  if (taskStatus === TaskStatus.ToDo) return '⏸'
  if (taskStatus === TaskStatus.Doing) return '▶'
  if (taskStatus === TaskStatus.Done) return '🏁'
  throw new Error(`Unknown status: ${taskStatus}`)
}
</script>

<template>
  <span>
    {{ getDisplay(props.status) }}
  </span>
</template>
