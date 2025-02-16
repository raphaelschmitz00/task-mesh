<script setup lang="ts">
import TmInput from "@/components/forms/TmInput.vue";
import TmActionItem from "@/components/lists/TmActionItem.vue";
import TmList from "@/components/lists/TmList.vue";
import { Task, taskStore } from "@/stores/Task";
import { watchDebounced } from "@vueuse/core";
import { reactive, watch } from "vue";

const props = defineProps<{
  exclude: Task[];
}>();

class State {
  searchTerm: string = "";
  tasks = new Array<Task>();
}
const state = reactive(new State());

const emit = defineEmits<{
  taskChosen: [task: Task];
}>();

async function fetch() {
  state.tasks = await taskStore.query(
    (x) =>
      !props.exclude.map((x) => x.id).includes(x.id) &&
      x.name.toLowerCase().includes(state.searchTerm.toLowerCase()),
    6,
  );
}

watch(() => props.exclude, fetch);
watchDebounced(() => state.searchTerm, fetch, { debounce: 500 });
fetch();
</script>

<template>
  <div>
    <TmInput v-model="state.searchTerm" placeholder="Search..." />
    <TmList hasBorder>
      <TmActionItem
        v-for="task in state.tasks"
        :key="task.id"
        :label="task.name"
        icon="add_circle"
        @click="emit('taskChosen', task)"
      />
    </TmList>
  </div>
</template>
