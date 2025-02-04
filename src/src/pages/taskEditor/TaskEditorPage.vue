<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { type Task, useTaskStore } from '@/stores/Task'
import StandardCard from '@/styling/StandardCard.vue'
import TaskStatusDropdown from '@/widgets/TaskStatusDropdown.vue'
import TaskStatusView from '@/widgets/TaskStatusView.vue'
import StandardButton from '@/styling/StandardButton.vue'
import DependencyEditorDialog from './DependencyEditorDialog.vue'

const props = defineProps<{
  idString: string
}>()

class State {
  addDependencyDialogIsShown = false
  task?: Task
}

const state = reactive(new State())

const taskStore = useTaskStore()
const router = useRouter()

function openDependencyDialog() {
  state.addDependencyDialogIsShown = true
}

function fetchTask() {
  const id = parseInt(props.idString)
  state.task = taskStore.get(id)
}

function updateTask() {
  taskStore.update(state.task!)
  router.back()
}

function deleteTask() {
  taskStore.remove(state.task!)
  router.back()
}

fetchTask()
</script>

<template>
  <StandardCard v-if="state.task">
    <h1>{{ `#${state.task.key} - ${state.task.name}` }}</h1>
    <div>
      <div v-if="!state.task.dependsOn.length">No Dependencies</div>
      <div v-else>
        Depends on: <br />
        <div v-for="id in state.task.dependsOn" :key="id">Task # {{ id }}</div>
      </div>

      <StandardButton icon="add" label="Add" @click="openDependencyDialog" />
      <DependencyEditorDialog v-model="state.addDependencyDialogIsShown" :task="state.task" />
    </div>
    <div>
      <TaskStatusView :status="state.task.status" class="statusRowItem" />
      <TaskStatusDropdown :model-value="state.task.status" class="statusRowItem" />
    </div>
    <StandardButton icon="delete" label="Delete" @click="deleteTask" />
    <StandardButton icon="save" label="Save" @click="updateTask" />
  </StandardCard>
</template>

<style lang="css" scoped>
.statusRowItem {
  display: inline-block;
}
</style>
