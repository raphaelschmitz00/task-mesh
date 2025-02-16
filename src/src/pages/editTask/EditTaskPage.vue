<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { Task, taskStore } from "@/stores/Task";
import Error404 from "@/components/errors/Error404.vue";
import EditTaskForm from "./EditTaskForm.vue";
import SkeletonText from "@/components/skeletons/SkeletonText.vue";

const props = defineProps<{
  id: string;
}>();

enum FetchState {
  Loading,
  NotFound,
  Fetched,
}

class State {
  fetchState = FetchState.Loading;
  task?: Task;
}
const state = reactive(new State());

const router = useRouter();

function fetch(): void {
  const idNumber = parseInt(props.id);
  if (!idNumber) {
    state.fetchState = FetchState.NotFound;
    return;
  }

  taskStore.get(idNumber).then((x) => {
    state.fetchState = x ? FetchState.Fetched : FetchState.NotFound;
    state.task = x;
  });
}

watch(() => props.id, fetch);
fetch();
</script>

<template>
  <div>
    <div v-if="state.fetchState === FetchState.Loading">
      <SkeletonText class="text-subtitle1" />
      <SkeletonText width="50%" class="text-subtitle1" />
      <SkeletonText class="text-caption" />
    </div>
    <Error404 v-else-if="state.fetchState === FetchState.NotFound" />
    <EditTaskForm
      v-else-if="state.task"
      v-model="state.task"
      @done-editing="router.back()"
    />
  </div>
</template>
