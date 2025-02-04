<script setup lang="ts">
import { reactive } from 'vue'
import { type Task } from '@/stores/Task'
import UpdateTaskWidget from '@/widgets/UpdateTaskWidget.vue'
import TaskStatusView from '@/widgets/TaskStatusView.vue'
import LinkButton from '@/components/buttons/TmLinkButton.vue'
import TmCard from '@/components/cards/TmCard.vue'
import TmCardSection from '@/components/cards/TmCardSection.vue'

const props = defineProps<{
  task: Task
}>()

class State {
  isEditing = false
}

const state = reactive(new State())
</script>

<template>
  <TmCard>
    <TmCardSection>
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
    </TmCardSection>
  </TmCard>
</template>
