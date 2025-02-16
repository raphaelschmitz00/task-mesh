<script setup lang="ts">
import { type Task, taskStore } from "@/stores/Task";
import Button from "@/components/buttons/Button.vue";
import Card from "@/components/cards/Card.vue";
import CardSection from "@/components/cards/CardSection.vue";
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
  <Card v-if="model">
    <CardSection>
      <h1>{{ `#${model.id} - ${model.name}` }}</h1>
    </CardSection>

    <CardSection>
      <DeadlineSection v-model="model" />
    </CardSection>

    <CardSection>
      <RequirementSection v-model="model" />
    </CardSection>

    <CardSection>
      <StatusSection v-model="model" />
    </CardSection>

    <CardSection>
      <Button icon="delete" label="Delete" @click="deleteTask" />
      <Button icon="save" label="Save" @click="updateTask" />
    </CardSection>
  </Card>
</template>
