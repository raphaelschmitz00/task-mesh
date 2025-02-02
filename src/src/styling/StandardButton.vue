<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <q-btn :label="props.label" @click="emit('click')" />
</template>
