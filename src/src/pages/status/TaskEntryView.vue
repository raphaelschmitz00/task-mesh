<script setup lang="ts">
import { computed, reactive } from "vue";
import { type Task, useTaskStore } from "@/stores/Task";
import UpdateTaskWidget from "@/widgets/UpdateTaskWidget.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";
import LinkButton from "@/components/buttons/TmLinkButton.vue";
import TmCard from "@/components/cards/TmCard.vue";
import TmCardSection from "@/components/cards/TmCardSection.vue";

const props = defineProps<{
  task: Task;
}>();

class State {
  isEditing = false;
}

const state = reactive(new State());

const taskStore = useTaskStore();
const blockingTasks = computed(() => taskStore.getBlockingTasks(props.task));
</script>

<template>
  <TmCard>
    <TmCardSection>
      <div v-if="blockingTasks.length">❌ Is Blocked</div>
      <div>
        <TaskStatusView :status="props.task.status" />
        # {{ props.task.id }} -
        <UpdateTaskWidget
          v-if="state.isEditing"
          :task="props.task"
          @updated="state.isEditing = false"
        />
        <span v-else> {{ props.task.name }}</span>
      </div>
      <LinkButton icon="edit" label="Edit" :path="`task/${props.task.id}`" />
    </TmCardSection>
  </TmCard>
</template>
