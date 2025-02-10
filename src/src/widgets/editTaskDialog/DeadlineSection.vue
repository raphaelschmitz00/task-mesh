<script setup lang="ts">
import { computed, reactive } from "vue";
import { type Task } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import EditDeadlineDialog from "./EditDeadlineDialog.vue";
import { useDeadlineStore } from "@/stores/Deadline";

const props = defineProps<{
  task: Task;
}>();

class State {
  editDialogIsShown = false;
}
const state = reactive(new State());

const deadlineStore = useDeadlineStore();
const deadline = computed(() => deadlineStore.getForTask(props.task));
</script>

<template>
  <span>
    <span v-if="!deadline">No Deadline</span>
    <span v-else>{{ deadline.date }}</span>
    <StandardButton
      icon="add"
      label="Edit"
      @click="state.editDialogIsShown = true"
    />
    <EditDeadlineDialog v-model="state.editDialogIsShown" :task="task" />
  </span>
</template>
