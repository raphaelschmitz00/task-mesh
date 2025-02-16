<script setup lang="ts">
import { reactive, watch } from "vue";
import { type Task } from "@/stores/Task";
import { requirementStore } from "@/stores/Requirement";
import Card from "@/components/cards/Card.vue";
import CardSection from "@/components/cards/CardSection.vue";
import TaskStatusView from "@/widgets/TaskStatusView.vue";
import ButtonLink from "@/components/buttons/ButtonLink.vue";
import { routes } from "../router";

const props = defineProps<{
  task: Task;
}>();

class State {
  blockingTasks = new Array<Task>();
}

const state = reactive(new State());

watch(
  () => props.task,
  async (x) =>
    (state.blockingTasks = await requirementStore.getBlockingTasks(x)),
);
</script>

<template>
  <Card>
    <CardSection>
      <div v-if="state.blockingTasks.length">❌ Is Blocked</div>
      <div>
        <TaskStatusView :status="task.status" />
        # {{ task.id }} - {{ task.name }}
      </div>

      <ButtonLink icon="edit" label="Edit" :path="routes.editTask(task.id)" />
    </CardSection>
  </Card>
</template>
