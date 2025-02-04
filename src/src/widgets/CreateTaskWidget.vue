<script setup lang="ts">
import { reactive } from 'vue'
import { useTaskStore, Task, TaskStatus } from '@/stores/Task'
import StandardButton from '@/components/buttons/TmButton.vue'
import StandardInput from '@/styling/StandardInput.vue'
import TmCard from '@/components/cards/TmCard.vue'
import TmCardSection from '@/components/cards/TmCardSection.vue'

class State {
  task: Task = new Task()
}

const state = reactive(new State())

const taskStore = useTaskStore()

function createTask() {
  taskStore.addCopy(state.task)
  state.task.status = TaskStatus.ToDo
  state.task.name = ''
}
</script>

<template>
  <TmCard class="createTaskWidget">
    <TmCardSection>
      <StandardInput v-model="state.task.name" @on-enter="createTask" />
      <StandardButton label="Create Task" @click="createTask" />
    </TmCardSection>
  </TmCard>
</template>

<style lang="css" scoped>
.createTaskWidget {
  max-width: 300px;
}
</style>
