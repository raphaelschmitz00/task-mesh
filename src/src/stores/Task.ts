import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export enum TaskStatus {
  ToDo,
  Doing,
  Done,
}

export class Task {
  key: number = -1
  status: TaskStatus = TaskStatus.ToDo
  name: string = ''
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
    return refTasks.value.filter((x) => x.key === key)[0]
  }

  function update(task: Task) {
    refTasks.value[task.key] = { ...refTasks.value[task.key], ...task }

    const storedTask = refTasks.value[task.key]
    storedTask.status = task.status
    storedTask.name = task.name
  }

  function remove(task: Task) {
    const index = refTasks.value.findIndex((x) => x.key === task.key)
    refTasks.value.splice(index, 1)
  }

  return { addCopy, get, allTasks, update, remove }
})
