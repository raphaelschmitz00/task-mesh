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

const tasks: Array<Task> = []

export const useTaskStore = defineStore('Tasks', () => {
  function add(task: Task) {
    tasks.push(task)
  }
  function get(key: number) {
    return tasks.filter((x) => x.key === key)
  }
  function update(task: Task) {
    const index = tasks.findIndex((x) => x.key === task.key)
    tasks[index] = task
  }
  function remove(task: Task) {
    const index = tasks.findIndex((x) => x.key === task.key)
    tasks.splice(index, 1)
  }

  return { add, get, update, remove }
})
