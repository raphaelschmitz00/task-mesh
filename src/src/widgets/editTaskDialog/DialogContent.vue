<script setup lang="ts">
import { computed, reactive } from "vue";
import { type Task, useTaskStore } from "@/stores/Task";
import TaskStatusDropdown from "@/widgets/TaskStatusDropdown.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";
import StandardButton from "@/components/buttons/TmButton.vue";
import DependencyEditorDialog from "./DependencyEditorDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import EditDeadlineDialog from "./EditDeadlineDialog.vue";
import { useDeadlineStore } from "@/stores/Deadline";
import { useRequirementStore } from "@/stores/Requirement";

const props = defineProps<{
  task: Task;
}>();

class State {
  editDeadlineDialogIsShown = false;
  addDependencyDialogIsShown = false;
}
const state = reactive(new State());

const emit = defineEmits<{
  doneEditing: [];
}>();

const requirementStore = useRequirementStore();
const deadlineStore = useDeadlineStore();

const blockingTasks = computed(() =>
  requirementStore.getBlockingTasks(props.task),
);
const deadline = computed(() => deadlineStore.getForTask(props.task));

function openDependencyDialog() {
  state.addDependencyDialogIsShown = true;
}

const taskStore = useTaskStore();
function updateTask() {
  taskStore.save(props.task);
  emit("doneEditing");
}

function deleteTask() {
  taskStore.remove(props.task);
  emit("doneEditing");
}
</script>

<template>
  <TmCard v-if="task">
    <TmCardSection>
      <h1>{{ `#${task.id} - ${task.name}` }}</h1>
    </TmCardSection>

    <TmCardSection>
      <span v-if="!deadline">No Deadline</span>
      <span v-else>{{ deadline.date }}</span>
      <StandardButton
        icon="add"
        label="Edit"
        @click="state.editDeadlineDialogIsShown = true"
      />
      <EditDeadlineDialog
        v-model="state.editDeadlineDialogIsShown"
        :task="task"
      />
    </TmCardSection>

    <TmCardSection>
      <div v-if="!blockingTasks.length">✔ Can be started</div>
      <div v-else>
        ❌ Blocked by: <br />
        <div v-for="task in blockingTasks" :key="task.id">
          {{ `${task.name} (#${task.id})` }}
        </div>
      </div>

      <StandardButton icon="add" label="Add" @click="openDependencyDialog" />
      <DependencyEditorDialog
        v-model="state.addDependencyDialogIsShown"
        :task="task"
      />
    </TmCardSection>

    <TmCardSection>
      <div>
        <TaskStatusView :status="task.status" class="statusRowItem" />
        <TaskStatusDropdown :model-value="task.status" class="statusRowItem" />
      </div>
    </TmCardSection>

    <TmCardSection>
      <StandardButton icon="delete" label="Delete" @click="deleteTask" />
      <StandardButton icon="save" label="Save" @click="updateTask" />
    </TmCardSection>
  </TmCard>
</template>

<style lang="css" scoped>
.statusRowItem {
  display: inline-block;
}
</style>
