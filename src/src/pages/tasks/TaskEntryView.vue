<script setup lang="ts">
import { reactive } from 'vue'
import { type Task, useTaskStore } from '@/stores/Task'
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

function deleteTask() {
  taskStore.remove(props.task)
}
</script>

<template>
  <div>
    <span>
      # {{ props.task.key }} -
      <TaskStatusEditor :status="props.task.status" />
      <UpdateTaskWidget
        v-if="state.isEditing"
        :task="props.task"
        @updated="state.isEditing = false"
      />
      <span v-else> {{ props.task.name }}</span>
    </span>
    <a @click.stop.prevent="state.isEditing = true" href="">🖊</a>
    <a @click.stop.prevent="deleteTask" href="">🗑</a>
  </div>
</template>

<style lang="css" scoped>
a {
  color: white;
}
</style>
