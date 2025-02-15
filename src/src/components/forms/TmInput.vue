<script setup lang="ts">
const model = defineModel<string>();

const props = defineProps<{
  label?: string;
  placeholder?: string;
  class?: string;
}>();

const emit = defineEmits<{
  onEnter: [];
}>();
</script>

<template>
  <q-input
    v-model="model"
    :label="props.label"
    :placeholder="props.placeholder"
    :class="props.class"
    v-on:keyup.enter="emit('onEnter')"
  />
</template>
