<script setup lang="ts">
import { reactive } from "vue";
import { taskStore } from "@/stores/Task";
import sortIntoDateGroups, { type DateGroup } from "./sortIntoDateGroups";
import DateView from "@/components/DateView.vue";

class State {
  dateGroups: DateGroup[] = [];
}
const state = reactive(new State());

taskStore
  .query(() => true)
  .then(sortIntoDateGroups)
  .then((x) => (state.dateGroups = x));
</script>

<template>
  <div>
    MESH
    <div></div>
    <div>
      <div
        v-for="dateGroup in state.dateGroups"
        :key="dateGroup.date?.toString()"
        class="periodColumn"
      >
        deadline:
        <DateView v-if="dateGroup.date" :date="dateGroup.date" />
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
