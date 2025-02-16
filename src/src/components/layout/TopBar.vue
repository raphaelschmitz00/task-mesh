<script setup lang="ts">
import { useRouter } from "vue-router";
import { routes } from "@/pages/router";

const emit = defineEmits<{
  drawerToggled: [];
}>();

const logoPath = `img:${import.meta.env.BASE_URL}logo.svg`;
const router = useRouter();
</script>

<template>
  <q-header elevated reveal>
    <q-toolbar>
      <q-btn flat @click="emit('drawerToggled')" round icon="menu" />
      <q-btn
        :icon="logoPath"
        color="white"
        round
        unelevated
        @click="router.push(routes.home())"
      />
      <q-toolbar-title>Task Mesh</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
