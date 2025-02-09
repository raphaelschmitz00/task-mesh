<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { type Task, useTaskStore } from "@/stores/Task";
import TmDialog from "@/components/dialogs/TmDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import TmList from "@/components/lists/TmList.vue";
import TmActionItem from "@/components/lists/TmActionItem.vue";
import TmCardActionSection from "@/components/cards/TmCardActionSection.vue";
import TmFlatButton from "@/components/buttons/TmFlatButton.vue";
import { Requirement, useRequirementStore } from "@/stores/Requirement";

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  addedTasks: Task[] = [];
  removedTasks: Task[] = [];
}

const state = reactive(new State());

const taskStore = useTaskStore();
const requirementStore = useRequirementStore();

const currentRequiredTasks = computed(() =>
  requirementStore.getRequiredTasks(props.task),
);

const chosenTasks = computed(() =>
  [...currentRequiredTasks.value, ...state.addedTasks].filter((x) =>
    state.removedTasks.includes(x),
  ),
);

const unchosenTasks = computed(() =>
  taskStore.query((x) => !chosenTasks.value.includes(x)),
);

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

function exitSavingChanges() {
  for (const task of state.addedTasks) {
    requirementStore.save(new Requirement(task.id, props.task.id));
  }

  for (const task of state.removedTasks) {
    const requirement = requirementStore.query(
      (x) =>
        x.requiredTaskId === task.id && x.dependentTaskId === props.task.id,
    )[0];

    if (!requirement) {
      throw new Error(`No Requirement ${props.task.id} => ${task.id}`);
    }

    requirementStore.remove(requirement);
  }

  reset();
  model.value = false;
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
            v-for="requiredTask in chosenTasks"
            :key="requiredTask.id"
            :label="requiredTask.name"
            icon="remove_circle"
            @click="removeDependency(requiredTask)"
          />
        </TmList>
      </TmCardSection>

      <TmCardSection class="q-pt-none">
        <span>Available</span>
        <TmList hasBorder>
          <TmActionItem
            v-for="requiredTask in unchosenTasks"
            :key="requiredTask.id"
            :label="requiredTask.name"
            icon="add_circle"
            @click="addDependency(requiredTask)"
          />
        </TmList>
      </TmCardSection>

      <TmCardActionSection>
        <TmFlatButton label="Cancel" @click="exitDiscardingChanges" />
        <TmFlatButton label="Save Changes" @click="exitSavingChanges" />
      </TmCardActionSection>
    </TmCard>
  </TmDialog>
</template>
