<script setup lang="ts">
import { Task, taskStore } from "@/stores/Task";
import EditTaskForm from "./EditTaskForm.vue";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  id: string;
}>();

class State {
  task?: Task;
}
const state = reactive(new State());

const router = useRouter();

function fetch(): void {
  taskStore.get(parseInt(props.id)).then((x) => (state.task = x));
}

watch(() => props.id, fetch);
fetch();
</script>

<template>
  <div>
    <EditTaskForm
      v-if="state.task"
      v-model="state.task"
      @done-editing="router.back()"
    />
  </div>
</template>
