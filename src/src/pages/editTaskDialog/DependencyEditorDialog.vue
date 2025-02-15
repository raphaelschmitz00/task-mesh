<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { type Task, taskStore } from "@/stores/Task";
import TmDialog from "@/components/dialogs/TmDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import TmList from "@/components/lists/TmList.vue";
import TmActionItem from "@/components/lists/TmActionItem.vue";
import TmCardActionSection from "@/components/cards/TmCardActionSection.vue";
import TmFlatButton from "@/components/buttons/TmFlatButton.vue";
import { Requirement, requirementStore } from "@/stores/Requirement";
import DependencySearch from "./DependencySearch.vue";

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  storedRequiredTasks: Task[] = [];
  addedTasks: Task[] = [];
  removedTasks: Task[] = [];
}
const state = reactive(new State());

const emit = defineEmits<{
  dependenciesChanged: [];
}>();

async function fetchRequiredTasks() {
  const requirements = await requirementStore.query(
    (x) => x.dependentTaskId == props.task.id,
  );

  const tasks = new Array<Task>();
  state.storedRequiredTasks.length = 0;
  for await (const requirement of requirements) {
    const task = await taskStore.get(requirement.requiredTaskId)!;
    tasks.push(task);
  }
  state.storedRequiredTasks.push(...tasks);
}

watch(
  () => model.value,
  (x) => x && fetchRequiredTasks(),
);
watch(() => props.task, fetchRequiredTasks);
fetchRequiredTasks();

const chosenTasks = computed(() =>
  [...state.storedRequiredTasks, ...state.addedTasks].filter(
    (x) => !state.removedTasks.includes(x),
  ),
);

const tasksToExcludeFromAvailable = computed(() => [
  props.task,
  ...chosenTasks.value,
]);

function addDependency(task: Task) {
  const indexInRemovedTasks = state.removedTasks.indexOf(task);
  if (indexInRemovedTasks === -1) state.addedTasks.push(task);
  else state.removedTasks.splice(indexInRemovedTasks, 1);
}

function removeDependency(task: Task) {
  const indexInAddedTasks = state.addedTasks.indexOf(task);
  if (indexInAddedTasks === -1) state.removedTasks.push(task);
  else state.addedTasks.splice(indexInAddedTasks, 1);
}

function reset() {
  state.addedTasks.length = 0;
  state.removedTasks.length = 0;
}

async function exitSavingChanges() {
  for (const task of state.addedTasks) {
    await requirementStore.save(new Requirement(task.id, props.task.id));
  }

  await requirementStore.removeFromTask(props.task, state.removedTasks);

  reset();
  model.value = false;
  emit("dependenciesChanged");
}

function exitDiscardingChanges() {
  reset();
  model.value = false;
}

watch(
  () => props.task,
  () => reset(),
);
</script>

<template>
  <TmDialog v-model="model">
    <TmCard>
      <TmCardSection>
        <h2>Add Dependency</h2>
      </TmCardSection>

      <TmCardSection class="q-pt-none">
        <span>Required Tasks</span>
        <TmList hasBorder>
          <TmActionItem
            v-for="chosenTask in chosenTasks"
            :key="chosenTask.id"
            :label="chosenTask.name"
            icon="remove_circle"
            @click="removeDependency(chosenTask)"
          />
        </TmList>
      </TmCardSection>

      <TmCardSection class="q-pt-none">
        <span>Available</span>
        <DependencySearch
          :exclude="tasksToExcludeFromAvailable"
          @taskChosen="addDependency"
        />
      </TmCardSection>

      <TmCardActionSection>
        <TmFlatButton label="Cancel" @click="exitDiscardingChanges" />
        <TmFlatButton label="Save Changes" @click="exitSavingChanges" />
      </TmCardActionSection>
    </TmCard>
  </TmDialog>
</template>
