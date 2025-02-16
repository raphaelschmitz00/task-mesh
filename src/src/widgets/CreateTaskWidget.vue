<script setup lang="ts">
import { reactive } from "vue";
import { taskStore, Task, TaskStatus } from "@/stores/Task";
import Button from "@/components/buttons/Button.vue";
import StandardInput from "@/components/forms/TmInput.vue";
import Card from "@/components/cards/Card.vue";
import CardSection from "@/components/cards/CardSection.vue";

class State {
  task: Task = new Task("");
}

const state = reactive(new State());

async function createTask() {
  await taskStore.save({ ...state.task });
  state.task.status = TaskStatus.ToDo;
  state.task.name = "";
}
</script>

<template>
  <Card class="createTaskWidget">
    <CardSection>
      <StandardInput v-model="state.task.name" @on-enter="createTask" />
      <Button label="Create Task" @click="createTask" />
    </CardSection>
  </Card>
</template>

<style lang="css" scoped>
.createTaskWidget {
  max-width: 300px;
}
</style>
