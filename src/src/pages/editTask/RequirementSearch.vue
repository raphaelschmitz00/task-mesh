<script setup lang="ts">
import Input from "@/components/forms/Input.vue";
import ListActionItem from "@/components/lists/ListActionItem.vue";
import List from "@/components/lists/List.vue";
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
    <Input v-model="state.searchTerm" placeholder="Search..." />
    <List hasBorder>
      <ListActionItem
        v-for="task in state.tasks"
        :key="task.id"
        :label="task.name"
        icon="add_circle"
        @click="emit('taskChosen', task)"
      />
    </List>
  </div>
</template>
