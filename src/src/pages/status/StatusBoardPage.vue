<script setup lang="ts">
import { useTaskStore, TaskStatus } from '@/stores/Task'
import CreateTaskWidget from '@/widgets/CreateTaskWidget.vue'
import TaskEntryView from './TaskEntryView.vue'
import { computed } from 'vue'

const taskStore = useTaskStore()

const getWithStatus = (status: TaskStatus) => taskStore.allTasks.filter((x) => x.status === status)

const todos = computed(() => getWithStatus(TaskStatus.ToDo))
const doings = computed(() => getWithStatus(TaskStatus.Doing))
const dones = computed(() => getWithStatus(TaskStatus.Done))
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <table>
      <tbody>
        <tr>
          <td>
            ToDo
            <ul>
              <li v-for="task in todos" :key="task.key">
                <TaskEntryView :task="task" />
              </li>
            </ul>
          </td>
          <td>
            Doing
            <ul>
              <li v-for="task in doings" :key="task.key">
                <TaskEntryView :task="task" />
              </li>
            </ul>
          </td>
          <td>
            Done
            <ul>
              <li v-for="task in dones" :key="task.key">
                <TaskEntryView :task="task" />
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <CreateTaskWidget />
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}
td {
  width: 33%;
}
</style>
