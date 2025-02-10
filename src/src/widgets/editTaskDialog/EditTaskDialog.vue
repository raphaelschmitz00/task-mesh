<script setup lang="ts">
import TmDialog from "@/components/dialogs/TmDialog.vue";
import type { Task } from "@/stores/Task";
import { defineAsyncComponent } from "vue";
const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

const AsyncDialogContent = defineAsyncComponent(
  () => import("./DialogContent.vue"),
);
</script>

<template>
  <TmDialog v-model="model">
    <AsyncDialogContent :task="props.task" @done-editing="model = false" />
  </TmDialog>
</template>
