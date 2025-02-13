<script setup lang="ts">
import { type Task, taskStore } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import DeadlineSection from "./DeadlineSection.vue";
import RequirementSection from "./RequirementSection.vue";
import StatusSection from "./StatusSection.vue";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  doneEditing: [];
}>();

async function updateTask() {
  await taskStore.save(props.task);
  emit("doneEditing");
}

async function deleteTask() {
  await taskStore.remove(props.task);
  emit("doneEditing");
}
</script>

<template>
  <TmCard v-if="task">
    <TmCardSection>
      <h1>{{ `#${task.id} - ${task.name}` }}</h1>
    </TmCardSection>

    <TmCardSection>
      <DeadlineSection :task="task" />
    </TmCardSection>

    <TmCardSection>
      <RequirementSection :task="task" />
    </TmCardSection>

    <TmCardSection>
      <StatusSection :task="task" />
    </TmCardSection>

    <TmCardSection>
      <StandardButton icon="delete" label="Delete" @click="deleteTask" />
      <StandardButton icon="save" label="Save" @click="updateTask" />
    </TmCardSection>
  </TmCard>
</template>
