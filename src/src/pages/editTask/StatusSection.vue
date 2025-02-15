<script setup lang="ts">
import type { Task } from "@/stores/Task";
import TaskStatusDropdown from "@/widgets/TaskStatusDropdown.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";

const model = defineModel<Task>({ required: true });
</script>

<template>
  <div>
    <TaskStatusView :status="model.status" class="statusRowItem" />
    <TaskStatusDropdown v-model="model.status" class="statusRowItem" />
  </div>
</template>
