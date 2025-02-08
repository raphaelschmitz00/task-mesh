<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task, useTaskStore } from "@/stores/Task";
import TmDialog from "@/components/dialogs/TmDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import TmCardActionSection from "@/components/cards/TmCardActionSection.vue";
import TmFlatButton from "@/components/buttons/TmFlatButton.vue";

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  chosenDateTime: string = "";
}

const state = reactive(new State());

const taskStore = useTaskStore();

function fetchTask() {
  if (props.task.deadline) {
    state.chosenDateTime = JSON.stringify(props.task.deadline);
  }
}

function exitSavingChanges() {
  const date = state.chosenDateTime
    ? new Date(state.chosenDateTime)
    : undefined;
  taskStore.update({ ...props.task, deadline: date });
  model.value = false;
}

function exitDiscardingChanges() {
  model.value = false;
}

watch(() => props.task, fetchTask);

fetchTask();
</script>

<template>
  <TmDialog v-model="model">
    <TmCard>
      <TmCardSection>
        <h2>Edit Deadline</h2>
      </TmCardSection>

      <TmCardSection> Current value: {{ state.chosenDateTime }} </TmCardSection>

      <TmCardSection>
        <q-date v-model="state.chosenDateTime" mask="YYYY-MM-DD HH:mm" />
        <q-time v-model="state.chosenDateTime" mask="YYYY-MM-DD HH:mm" />
      </TmCardSection>

      <TmCardActionSection>
        <TmFlatButton label="Cancel" @click="exitDiscardingChanges" />
        <TmFlatButton label="Save Changes" @click="exitSavingChanges" />
      </TmCardActionSection>
    </TmCard>
  </TmDialog>
</template>
