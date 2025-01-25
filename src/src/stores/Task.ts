import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export enum TaskStatus {
  ToDo,
  Doing,
  Done,
}

export interface Task {
  key: number
  status: TaskStatus
  name: string
}

const refTasks = ref(new Array<Task>())

export const useTaskStore = defineStore('Tasks', () => {
  let keyCounter = 0

  const allTasks = computed(() => refTasks.value.map((x) => x))

  function addCopy(task: Task) {
    const newTask: Task = {
      key: keyCounter++,
      status: task.status,
      name: task.name,
    }
    refTasks.value.push(newTask)
    return newTask
  }

  function get(key: number) {
    return refTasks.value.filter((x) => x.key === key)
  }

  function update(task: Task) {
    const index = refTasks.value.findIndex((x) => x.key === task.key)
    refTasks.value[index] = task
  }

  function remove(task: Task) {
    const index = refTasks.value.findIndex((x) => x.key === task.key)
    refTasks.value.splice(index, 1)
  }

  return { addCopy, get, allTasks, update, remove }
})
