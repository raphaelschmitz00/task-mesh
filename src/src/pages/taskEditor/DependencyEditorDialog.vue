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

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  addDependencyDialogIsShown = false;
  task?: Task;
  availableTasks: Task[] = [];
  chosenTasks: Task[] = [];
}

const state = reactive(new State());

const taskStore = useTaskStore();

const unchosenTasks = computed(() =>
  state.availableTasks.filter((x) => !state.chosenTasks.includes(x)),
);

function fetchTask() {
  state.availableTasks = taskStore.allTasks.filter((x) => x != props.task);
  state.chosenTasks = state.availableTasks.filter((x) =>
    props.task.dependsOn.includes(x.id),
  );
}

function addDependency(task: Task) {
  state.chosenTasks.push(task);
}
function removeDependency(task: Task) {
  const index = state.chosenTasks.indexOf(task);
  state.chosenTasks.splice(index, 1);
}

function exitSavingChanges() {
  const chosenIds = state.chosenTasks.map((x) => x.id);
  taskStore.update({ ...props.task, dependsOn: chosenIds });
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
            v-for="requiredTask in state.chosenTasks"
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
