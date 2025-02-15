<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import StandardButton from "@/components/buttons/TmButton.vue";
import RequirementEditorDialog from "./RequirementEditorDialog.vue";
import { requirementStore } from "@/stores/Requirement";

const model = defineModel<Task>({ required: true });

class State {
  editDialogIsShown = false;
  blockingTasks = new Array<Task>();
}
const state = reactive(new State());

async function fetch() {
  state.blockingTasks = await requirementStore.getBlockingTasks(model.value);
}

watch(() => model, fetch);
fetch();
</script>

<template>
  <span>
    <div v-if="!state.blockingTasks.length">✔ Can be started</div>
    <div v-else>
      ❌ Blocked by: <br />
      <div v-for="task in state.blockingTasks" :key="task.id">
        {{ `${task.name} (#${task.id})` }}
      </div>
    </div>

    <StandardButton
      icon="add"
      label="Add"
      @click="state.editDialogIsShown = true"
    />
    <RequirementEditorDialog
      v-model="state.editDialogIsShown"
      :task="model"
      @requirements-changed="fetch"
    />
  </span>
</template>
