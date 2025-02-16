<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <q-time v-model="model" mask="YYYY-MM-DD HH:mm" />
</template>
