<script setup lang="ts">
import { computed, reactive } from "vue";
import { type Task } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import DependencyEditorDialog from "./DependencyEditorDialog.vue";
import { useRequirementStore } from "@/stores/Requirement";

const props = defineProps<{
  task: Task;
}>();

class State {
  editDialogIsShown = false;
}
const state = reactive(new State());

const requirementStore = useRequirementStore();

const blockingTasks = computed(() =>
  requirementStore.getBlockingTasks(props.task),
);

function openDependencyDialog() {
  state.editDialogIsShown = true;
}
</script>

<template>
  <span>
    <div v-if="!blockingTasks.length">✔ Can be started</div>
    <div v-else>
      ❌ Blocked by: <br />
      <div v-for="task in blockingTasks" :key="task.id">
        {{ `${task.name} (#${task.id})` }}
      </div>
    </div>

    <StandardButton icon="add" label="Add" @click="openDependencyDialog" />
    <DependencyEditorDialog v-model="state.editDialogIsShown" :task="task" />
  </span>
</template>
