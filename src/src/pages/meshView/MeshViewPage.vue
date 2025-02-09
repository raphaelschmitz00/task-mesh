<script setup lang="ts">
import { computed } from "vue";
import { useTaskStore } from "@/stores/Task";
import sortTasksIntoDateGroups from "./sortTasksIntoDateGroups";
import DateView from "@/components/DateView.vue";

const taskStore = useTaskStore();

const dateGroups = computed(() => sortTasksIntoDateGroups(taskStore.allTasks));
</script>

<template>
  <div>
    MESH
    <div>
      <div
        v-for="dateGroup in dateGroups"
        :key="dateGroup.deadline?.toString()"
        class="periodColumn"
      >
        deadline:
        <DateView v-if="dateGroup.deadline" :date="dateGroup.deadline" />
        <span v-else>None</span>
        <div>
          <div v-for="task in dateGroup.tasks" :key="task.id">
            {{ task.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.periodColumn {
  display: inline-block;
  outline: blueviolet solid 2px;
  margin: 0 6px;
}
</style>
