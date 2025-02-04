<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  label?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <q-btn :icon="props.icon" :label="props.label" @click="emit('click')" />
</template>
