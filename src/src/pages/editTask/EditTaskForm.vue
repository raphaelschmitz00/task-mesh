<script setup lang="ts">
import { type Task, taskStore } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import DeadlineSection from "./DeadlineSection.vue";
import RequirementSection from "./RequirementSection.vue";
import StatusSection from "./StatusSection.vue";

const model = defineModel<Task>({ required: true });

const emit = defineEmits<{
  doneEditing: [];
}>();

async function updateTask() {
  console.log("updateTask", model.value);
  await taskStore.save(model.value);
  emit("doneEditing");
}

async function deleteTask() {
  await taskStore.remove(model.value);
  emit("doneEditing");
}
</script>

<template>
  <TmCard v-if="model">
    <TmCardSection>
      <h1>{{ `#${model.id} - ${model.name}` }}</h1>
    </TmCardSection>

    <TmCardSection>
      <DeadlineSection v-model="model" />
    </TmCardSection>

    <TmCardSection>
      <RequirementSection v-model="model" />
    </TmCardSection>

    <TmCardSection>
      <StatusSection v-model="model" />
    </TmCardSection>

    <TmCardSection>
      <StandardButton icon="delete" label="Delete" @click="deleteTask" />
      <StandardButton icon="save" label="Save" @click="updateTask" />
    </TmCardSection>
  </TmCard>
</template>
