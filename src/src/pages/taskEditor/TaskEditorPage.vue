<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { type Task, TaskStatus, useTaskStore } from '@/stores/Task'
import StandardCard from '@/styling/StandardCard.vue'
import TaskStatusDropdown from '@/widgets/TaskStatusDropdown.vue'
import UpdateTaskWidget from '@/widgets/UpdateTaskWidget.vue'
import TaskStatusView from '@/widgets/TaskStatusView.vue'
import StandardButton from '@/styling/StandardButton.vue'

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

const availableTasks = computed(() =>
  taskStore.allTasks
    .filter((x) => x.key != state.task?.key)
    .filter((x) => !state.task?.dependsOn.includes(x.key)),
)

const chosenTasks: { [id: number]: boolean } = {}

function addChosenTasks() {}

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

function addDependency() {
  const availableTasks = taskStore.allTasks
    .filter((x) => x.key != state.task?.key)
    .filter((x) => !state.task?.dependsOn.includes(x.key))

  state.task!.dependsOn.push(5)
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

      <StandardButton icon="add" label="Add" @click="state.addDependencyDialogIsShown = true" />
      <q-dialog v-model="state.addDependencyDialogIsShown">
        <q-card>
          <q-card-section>
            <div class="text-h6">Add Dependency</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div v-for="id in state.task.dependsOn" :key="id">Task # {{ id }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-list>
              <q-item v-for="task in availableTasks" :key="task.key">
                <q-item-section side top>
                  <q-checkbox v-model="chosenTasks[task.key]" />
                </q-item-section>
              </q-item>

              <div v-for="task in availableTasks" :key="task.key">
                {{ task.key }} - {{ task.name }}
              </div>
            </q-list>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
