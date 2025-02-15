<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import EditDeadlineDialog from "./EditDeadlineDialog.vue";
import { Deadline, deadlineStore } from "@/stores/Deadline";
import DateView from "@/components/DateView.vue";

const model = defineModel<Task>({ required: true });

class State {
  editDialogIsShown = false;
  deadline?: Deadline;
}
const state = reactive(new State());

async function fetch() {
  state.deadline = await deadlineStore.getForTask(model.value);
}

watch(() => model, fetch);
fetch();
</script>

<template>
  <span>
    <span v-if="!state.deadline">No Deadline</span>
    <DateView v-else :date="state.deadline.date" />
    <StandardButton
      icon="add"
      label="Edit"
      @click="state.editDialogIsShown = true"
    />
    <EditDeadlineDialog v-model="state.editDialogIsShown" :task="model" />
  </span>
</template>
