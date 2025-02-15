<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import EditDeadlineDialog from "./EditDeadlineDialog.vue";
import { Deadline, deadlineStore } from "@/stores/Deadline";

const model = defineModel<Task>({ required: true });

class State {
  editDialogIsShown = false;
  deadline?: Deadline;
}
const state = reactive(new State());

watch(
  () => model,
  async () => (state.deadline = await deadlineStore.getForTask(model.value)),
);
</script>

<template>
  <span>
    <span v-if="!state.deadline">No Deadline</span>
    <span v-else>{{ state.deadline.date }}</span>
    <StandardButton
      icon="add"
      label="Edit"
      @click="state.editDialogIsShown = true"
    />
    <EditDeadlineDialog v-model="state.editDialogIsShown" :task="model" />
  </span>
</template>
