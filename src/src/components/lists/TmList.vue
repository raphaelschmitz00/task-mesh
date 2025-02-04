<script setup lang="ts">
const props = defineProps<{
  hasBorder: boolean;
}>();
</script>

<template>
  <q-list :bordered="props.hasBorder">
    <slot />
  </q-list>
</template>
