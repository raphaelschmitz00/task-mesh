<script setup lang="ts">
import { reactive } from "vue";
import { taskStore } from "@/stores/Task";
import sortTasksIntoDateGroups, { DateGroup } from "./sortTasksIntoDateGroups";
import DateView from "@/components/DateView.vue";

class State {
  dateGroups: DateGroup[] = [];
}
const state = reactive(new State());

const tasks = await taskStore.query(() => true);
state.dateGroups = await sortTasksIntoDateGroups(tasks);
</script>

<template>
  <div>
    MESH
    <div>
      <div
        v-for="dateGroup in state.dateGroups"
        :key="dateGroup.deadline?.toString()"
        class="periodColumn"
      >
        deadline:
        <DateView v-if="dateGroup.deadline" :date="dateGroup.deadline.date" />
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
