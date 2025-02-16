<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <q-dialog v-model="model">
    <slot />
  </q-dialog>
</template>
