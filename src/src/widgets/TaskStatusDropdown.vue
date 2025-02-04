<script setup lang="ts">
import { TaskStatus, allTaskStatuses, getTaskStatusName } from '@/stores/Task'
import StandardSelect from '@/components/forms/TmSelect.vue'

const model = defineModel<TaskStatus>()
</script>

<template>
  <StandardSelect v-model="model" :options="allTaskStatuses" :option-label="getTaskStatusName" />
</template>
