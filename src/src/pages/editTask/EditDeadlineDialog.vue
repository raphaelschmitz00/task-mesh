<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import Dialog from "@/components/dialogs/Dialog.vue";
import Card from "@/components/cards/Card.vue";
import CardSection from "@/components/cards/CardSection.vue";
import CardActionSection from "@/components/cards/CardActionSection.vue";
import ButtonFlat from "@/components/buttons/ButtonFlat.vue";
import { Deadline, deadlineStore } from "@/stores/Deadline";
import DatePicker from "@/components/forms/DatePicker.vue";
import TimePicker from "@/components/forms/TimePicker.vue";

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
  deadline.date = date;
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
  <Dialog v-model="model">
    <Card>
      <CardSection>
        <h2>Edit Deadline</h2>
      </CardSection>

      <CardSection> Current value: {{ state.chosenDateTime }} </CardSection>

      <CardSection>
        <DatePicker v-model="state.chosenDateTime" />
        <TimePicker v-model="state.chosenDateTime" />
      </CardSection>

      <CardActionSection>
        <ButtonFlat label="Cancel" @click="exitDiscardingChanges" />
        <ButtonFlat label="Save Changes" @click="exitSavingChanges" />
      </CardActionSection>
    </Card>
  </Dialog>
</template>
