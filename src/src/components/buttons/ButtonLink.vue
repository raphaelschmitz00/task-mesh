<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  icon?: string;
  label?: string;
  path: string;
}>();

const router = useRouter();
</script>

<template>
  <q-btn
    :icon="props.icon"
    :label="props.label"
    @click="router.push(props.path)"
  />
</template>
