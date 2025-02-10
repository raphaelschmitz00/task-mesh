<script setup lang="ts">
import { computed, reactive } from "vue";
import { type Task } from "@/stores/Task";
import { useRequirementStore } from "@/stores/Requirement";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";
import UpdateTaskWidget from "@/widgets/UpdateTaskWidget.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";
import EditTaskDialog from "@/widgets/editTaskDialog/EditTaskDialog.vue";
import TmButton from "@/components/buttons/TmButton.vue";

const props = defineProps<{
  task: Task;
}>();

class State {
  isEditing = false;
  showEditDialog = false;
}

const state = reactive(new State());

const requirementStore = useRequirementStore();
const blockingTasks = computed(() =>
  requirementStore.getBlockingTasks(props.task),
);
</script>

<template>
  <TmCard>
    <TmCardSection>
      <div v-if="blockingTasks.length">❌ Is Blocked</div>
      <div>
        <TaskStatusView :status="task.status" />
        # {{ task.id }} -
        <UpdateTaskWidget
          v-if="state.isEditing"
          :task="task"
          @updated="state.isEditing = false"
        />
        <span v-else> {{ task.name }}</span>
      </div>

      <TmButton icon="edit" label="Edit" @click="state.showEditDialog = true" />
      <EditTaskDialog v-model="state.showEditDialog" :task="task" />
    </TmCardSection>
  </TmCard>
</template>
