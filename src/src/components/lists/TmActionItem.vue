<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <q-item clickable v-ripple @click="emit('click')">
    <q-item-section>{{ props.label }}</q-item-section>
    <q-item-section avatar>
      <q-icon color="primary" :name="props.icon" />
    </q-item-section>
  </q-item>
</template>
