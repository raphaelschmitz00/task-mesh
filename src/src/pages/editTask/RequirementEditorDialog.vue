<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import Dialog from "@/components/dialogs/Dialog.vue";
import Card from "@/components/cards/Card.vue";
import CardSection from "@/components/cards/CardSection.vue";
import List from "@/components/lists/List.vue";
import ListActionItem from "@/components/lists/ListActionItem.vue";
import CardActionSection from "@/components/cards/CardActionSection.vue";
import ButtonFlat from "@/components/buttons/ButtonFlat.vue";
import { Requirement, requirementStore } from "@/stores/Requirement";
import RequirementSearch from "./RequirementSearch.vue";

const model = defineModel<boolean>();

const props = defineProps<{
  task: Task;
}>();

class State {
  requiredTasks = new Array<Task>();
  addedTasks = new Array<Task>();
  removedTasks = new Array<Task>();
}
const state = reactive(new State());

const emit = defineEmits<{
  requirementsChanged: [];
}>();

async function fetchRequiredTasks() {
  state.requiredTasks = await requirementStore.getRequiredTasks(props.task);
}

watch(
  () => model.value,
  (x) => x && fetchRequiredTasks(),
);
watch(() => props.task, fetchRequiredTasks);
fetchRequiredTasks();

const chosenTasks = computed(() =>
  [...state.requiredTasks, ...state.addedTasks].filter(
    (x) => !state.removedTasks.includes(x),
  ),
);

function addRequirement(task: Task) {
  const indexInRemovedTasks = state.removedTasks.indexOf(task);
  if (indexInRemovedTasks === -1) state.addedTasks.push(task);
  else state.removedTasks.splice(indexInRemovedTasks, 1);
}

function removeRequirement(task: Task) {
  const indexInAddedTasks = state.addedTasks.indexOf(task);
  if (indexInAddedTasks === -1) state.removedTasks.push(task);
  else state.addedTasks.splice(indexInAddedTasks, 1);
}

const unaddableTasks = computed(() => [props.task, ...chosenTasks.value]);

function closeDialog() {
  state.addedTasks.length = 0;
  state.removedTasks.length = 0;
  model.value = false;
}

async function exitSavingChanges() {
  for (const task of state.addedTasks) {
    await requirementStore.save(new Requirement(task.id, props.task.id));
  }

  await requirementStore.removeFromTask(props.task, state.removedTasks);

  closeDialog();
  emit("requirementsChanged");
}
</script>

<template>
  <Dialog v-model="model">
    <Card>
      <CardSection>
        <h2>Add Requirement</h2>
      </CardSection>

      <CardSection class="q-pt-none">
        <span>Required Tasks</span>
        <List hasBorder>
          <ListActionItem
            v-for="chosenTask in chosenTasks"
            :key="chosenTask.id"
            :label="chosenTask.name"
            icon="remove_circle"
            @click="removeRequirement(chosenTask)"
          />
        </List>
      </CardSection>

      <CardSection class="q-pt-none">
        <span>Available</span>
        <RequirementSearch
          :exclude="unaddableTasks"
          @taskChosen="addRequirement"
        />
      </CardSection>

      <CardActionSection>
        <ButtonFlat label="Cancel" @click="closeDialog" />
        <ButtonFlat label="Save Changes" @click="exitSavingChanges" />
      </CardActionSection>
    </Card>
  </Dialog>
</template>
