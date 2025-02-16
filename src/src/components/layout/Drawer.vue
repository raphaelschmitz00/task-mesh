<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <q-drawer v-model="model" :width="200" :breakpoint="700" elevated>
    <q-scroll-area class="fit">
      <slot />
    </q-scroll-area>
  </q-drawer>
</template>
