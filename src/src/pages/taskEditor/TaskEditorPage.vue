<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/Task";
import TaskStatusDropdown from "@/widgets/TaskStatusDropdown.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";
import StandardButton from "@/components/buttons/TmButton.vue";
import DependencyEditorDialog from "./DependencyEditorDialog.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import EditDeadlineDialog from "./EditDeadlineDialog.vue";

const props = defineProps<{
  idString: string;
}>();

class State {
  editDeadlineDialogIsShown = false;
  addDependencyDialogIsShown = false;
}

const state = reactive(new State());

const taskStore = useTaskStore();
const router = useRouter();

const task = computed(() => taskStore.get(parseInt(props.idString)));
const blockingTasks = computed(() => taskStore.getBlockingTasks(task.value!));

function openDependencyDialog() {
  state.addDependencyDialogIsShown = true;
}

function updateTask() {
  taskStore.update(task.value!);
  router.back();
}

function deleteTask() {
  taskStore.remove(task.value!);
  router.back();
}
</script>

<template>
  <TmCard v-if="task">
    <TmCardSection>
      <h1>{{ `#${task.id} - ${task.name}` }}</h1>
    </TmCardSection>

    <TmCardSection>
      <span v-if="!task.deadline">No Deadline</span>
      <span v-else>{{ task.deadline }}</span>
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
