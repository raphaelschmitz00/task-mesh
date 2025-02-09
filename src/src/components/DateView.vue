<script setup lang="ts">
const props = defineProps<{
  date: Date;
}>();
</script>

<template>
  <span>
    {{ props.date.toLocaleDateString() }}
    {{ props.date.toLocaleTimeString() }}
  </span>
</template>
