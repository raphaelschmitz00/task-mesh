<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { type Task, useTaskStore } from '@/stores/Task'
import TmDialog from '@/components/dialogs/TmDialog.vue'
import TmCard from '@/components/cards/TmCard.vue'
import TmCardSection from '@/components/cards/TmCardSection.vue'

const model = defineModel<boolean>()

const props = defineProps<{
  task: Task
}>()

class State {
  addDependencyDialogIsShown = false
  task?: Task
  availableTasks: Task[] = []
  chosenTasks: Task[] = []
}

const state = reactive(new State())

const taskStore = useTaskStore()

const unchosenTasks = computed(() =>
  state.availableTasks.filter((x) => !state.chosenTasks.includes(x)),
)

function fetchTask() {
  state.availableTasks = taskStore.allTasks.filter((x) => x != props.task)
  state.chosenTasks = state.availableTasks.filter((x) => props.task.dependsOn.includes(x.key))
}

function addDependency(task: Task) {
  state.chosenTasks.push(task)
}
function removeDependency(task: Task) {
  const index = state.chosenTasks.indexOf(task)
  state.chosenTasks.splice(index, 1)
}

function exitSavingChanges() {
  const chosenIds = state.chosenTasks.map((x) => x.key)
  taskStore.update({ ...props.task, dependsOn: chosenIds })
  model.value = false
}

function exitDiscardingChanges() {
  model.value = false
}

watch(() => props.task, fetchTask)

fetchTask()
</script>

<template>
  <TmDialog v-model="model">
    <TmCard>
      <TmCardSection>
        <h2>Add Dependency</h2>
      </TmCardSection>

      <TmCardSection class="q-pt-none">
        <span>Required Tasks</span>
        <q-list bordered>
          <q-item
            v-for="requiredTask in state.chosenTasks"
            :key="requiredTask.key"
            clickable
            v-ripple
            @click="removeDependency(requiredTask)"
          >
            <q-item-section>{{ requiredTask.name }}</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="remove_circle" />
            </q-item-section>
          </q-item>
        </q-list>
      </TmCardSection>

      <TmCardSection class="q-pt-none">
        <span>Available</span>
        <q-list bordered>
          <q-item
            v-for="requiredTask in unchosenTasks"
            :key="requiredTask.key"
            clickable
            v-ripple
            @click="addDependency(requiredTask)"
          >
            <q-item-section>{{ requiredTask.name }}</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="add_circle" />
            </q-item-section>
          </q-item>
        </q-list>
      </TmCardSection>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup @click="exitDiscardingChanges" />
        <q-btn flat label="Save Changes" color="primary" v-close-popup @click="exitSavingChanges" />
      </q-card-actions>
    </TmCard>
  </TmDialog>
</template>
