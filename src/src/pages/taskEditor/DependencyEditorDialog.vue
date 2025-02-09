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
  availableTasks: Task[] = [];
  requirements: Requirement[] = [];
}

const state = reactive(new State());

const taskStore = useTaskStore();
const requirementStore = useRequirementStore();

const chosenTasks = computed(() =>
  requirementStore.getRequiredTasks(props.task),
);

const unchosenTasks = computed(() =>
  state.availableTasks.filter((x) => !chosenTasks.value.includes(x)),
);

function fetchTask() {
  state.availableTasks = taskStore.allTasks.filter((x) => x != props.task);
  state.requirements = requirementStore.query(
    (x) => x.dependentTaskId === props.task.id,
  );
}

function addDependency(task: Task) {
  state.requirements.push(new Requirement(task.id, props.task.id));
}
function removeDependency(task: Task) {
  const index = state.requirements.findIndex(
    (x) => x.requiredTaskId === task.id,
  );
  state.requirements.splice(index, 1);
}

function exitSavingChanges() {
  for (const requirement of state.requirements) {
    requirementStore.save(requirement);
  }
  model.value = false;
}

function exitDiscardingChanges() {
  model.value = false;
}

watch(() => props.task, fetchTask);

fetchTask();
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
