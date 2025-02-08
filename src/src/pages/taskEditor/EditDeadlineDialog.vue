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
  availableTasks: Task[] = [];
  chosenTasks: Task[] = [];
  chosenDateTIme: string = "";
}

const state = reactive(new State());

const taskStore = useTaskStore();

function fetchTask() {
  state.availableTasks = taskStore.allTasks.filter((x) => x != props.task);
  state.chosenTasks = state.availableTasks.filter((x) =>
    props.task.dependsOn.includes(x.id),
  );
}

function exitSavingChanges() {}

function exitDiscardingChanges() {}

watch(() => props.task, fetchTask);

fetchTask();
</script>

<template>
  <TmDialog v-model="model">
    <TmCard>
      <TmCardSection>
        <h2>Edit Deadline</h2>
      </TmCardSection>

      <TmCardSection> Current value: {{ state.chosenDateTIme }} </TmCardSection>

      <TmCardSection>
        <q-date v-model="state.chosenDateTIme" mask="YYYY-MM-DD HH:mm" />
        <q-time v-model="state.chosenDateTIme" mask="YYYY-MM-DD HH:mm" />
      </TmCardSection>

      <TmCardActionSection>
        <TmFlatButton label="Cancel" @click="exitDiscardingChanges" />
        <TmFlatButton label="Save Changes" @click="exitSavingChanges" />
      </TmCardActionSection>
    </TmCard>
  </TmDialog>
</template>
