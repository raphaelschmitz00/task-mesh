<script setup lang="ts">
import { TaskStatus, allTaskStatuses, getTaskStatusName } from "@/stores/Task";
import Select from "@/components/forms/Select.vue";

const model = defineModel<TaskStatus>();
</script>

<template>
  <Select
    v-model="model"
    :options="allTaskStatuses"
    :option-label="getTaskStatusName"
  />
</template>
