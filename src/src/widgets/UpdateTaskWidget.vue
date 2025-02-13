<script setup lang="ts">
import { reactive, watch } from "vue";
import { taskStore, Task } from "@/stores/Task";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  updated: [];
}>();

class State {
  task: Task = { ...props.task };
}

const state = reactive(new State());

watch(props, (newProps) => {
  state.task = newProps.task;
});

async function updateTask() {
  await taskStore.save(state.task);
  emit("updated");
  console.log(`updated ${JSON.stringify(state.task)}`);
}
</script>

<template>
  <input v-model="state.task.name" @keyup.enter="updateTask" />
</template>
