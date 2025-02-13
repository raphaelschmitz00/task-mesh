<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import TmDialog from "@/components/dialogs/TmDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import TmCardActionSection from "@/components/cards/TmCardActionSection.vue";
import TmFlatButton from "@/components/buttons/TmFlatButton.vue";
import { Deadline, deadlineStore } from "@/stores/Deadline";

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  chosenDateTime: string = "";
  deadline?: Deadline;
}
const state = reactive(new State());

async function fetchDeadline() {
  state.deadline = await deadlineStore.getForTask(props.task);
  if (state.deadline) {
    state.chosenDateTime = JSON.stringify(state.deadline.date);
  }
}

async function exitSavingChanges() {
  const date = new Date(state.chosenDateTime);
  const deadline = state.deadline || new Deadline(props.task.id, date);
  await deadlineStore.save(deadline);
  model.value = false;
}

function exitDiscardingChanges() {
  model.value = false;
}

watch(() => props.task, fetchDeadline);

fetchDeadline();
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
