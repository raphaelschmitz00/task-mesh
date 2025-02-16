<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <q-date v-model="model" mask="YYYY-MM-DD HH:mm" />
</template>
