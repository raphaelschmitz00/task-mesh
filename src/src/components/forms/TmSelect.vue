<script setup lang="ts">
const model = defineModel();

const props = defineProps<{
  label?: string;
  options: readonly unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionLabel?: (option: any) => string;
}>();
</script>

<template>
  <q-select
    v-model="model"
    :label="props.label"
    :options="props.options"
    :option-label="optionLabel"
    filled
  />
</template>
