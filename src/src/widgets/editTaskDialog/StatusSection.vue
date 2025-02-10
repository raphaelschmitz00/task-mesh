<script setup lang="ts">
import type { Task } from "@/stores/Task";
import TaskStatusDropdown from "@/widgets/TaskStatusDropdown.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";

defineProps<{
  task: Task;
}>();
</script>

<template>
  <div>
    <TaskStatusView :status="task.status" class="statusRowItem" />
    <TaskStatusDropdown :model-value="task.status" class="statusRowItem" />
  </div>
</template>
