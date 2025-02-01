<script setup lang="ts">
import { reactive } from 'vue'
import { type Task, TaskStatus, useTaskStore } from '@/stores/Task'
import StandardCard from '@/styling/StandardCard.vue'
import TaskStatusEditor from '@/widgets/TaskStatusEditor.vue'
import UpdateTaskWidget from '@/widgets/UpdateTaskWidget.vue'

const props = defineProps<{
  task: Task
}>()

class State {
  isEditing = false
}

const state = reactive(new State())

const taskStore = useTaskStore()

function updateStatus(status: TaskStatus) {
  taskStore.update({ ...props.task, status })
}

function deleteTask() {
  taskStore.remove(props.task)
}
</script>

<template>
  <StandardCard>
    <span>
      # {{ props.task.key }} -
      <TaskStatusEditor :status="props.task.status" @changed="updateStatus" />
      <UpdateTaskWidget
        v-if="state.isEditing"
        :task="props.task"
        @updated="state.isEditing = false"
      />
      <span v-else> {{ props.task.name }}</span>
    </span>
    <a class="iconLink" @click.stop.prevent="state.isEditing = true" href="">🖊</a>
    <a class="iconLink" @click.stop.prevent="deleteTask" href="">🗑</a>
  </StandardCard>
</template>

<style lang="css" scoped>
.iconLink {
  color: white;
  font-size: 2rem;
}
</style>
