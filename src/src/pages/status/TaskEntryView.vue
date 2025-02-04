<script setup lang="ts">
import { reactive } from 'vue'
import { type Task } from '@/stores/Task'
import StandardCard from '@/styling/StandardCard.vue'
import UpdateTaskWidget from '@/widgets/UpdateTaskWidget.vue'
import TaskStatusView from '@/widgets/TaskStatusView.vue'
import LinkButton from '@/styling/LinkButton.vue'

const props = defineProps<{
  task: Task
}>()

class State {
  isEditing = false
}

const state = reactive(new State())
</script>

<template>
  <StandardCard>
    <div v-if="props.task.dependsOn.length">Depends on {{ props.task.dependsOn.length }}</div>
    <div>
      <TaskStatusView :status="props.task.status" />
      # {{ props.task.key }} -
      <UpdateTaskWidget
        v-if="state.isEditing"
        :task="props.task"
        @updated="state.isEditing = false"
      />
      <span v-else> {{ props.task.name }}</span>
    </div>
    <LinkButton icon="edit" label="Edit" :path="`task/${props.task.key}`" />
  </StandardCard>
</template>
