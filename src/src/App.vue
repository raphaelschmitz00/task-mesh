<script setup lang="ts">
import { reactive } from "vue";
import { RouterView, useRouter } from "vue-router";

class State {
  drawerIsOpen: boolean = false;
}
const state = reactive(new State());

const router = useRouter();

const basePath = import.meta.env.BASE_URL;
</script>

<template>
  <q-layout view="hhh LpR fff">
    <q-header elevated reveal>
      <q-toolbar>
        <q-btn
          flat
          @click="state.drawerIsOpen = !state.drawerIsOpen"
          round
          icon="menu"
        />
        <q-btn
          flat
          round
          :icon="`img:${basePath}logo.svg`"
          @click="router.push('/')"
        />
        <q-toolbar-title>Task Mesh</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="state.drawerIsOpen"
      :width="200"
      :breakpoint="700"
      elevated
    >
      <q-scroll-area class="fit">
        <nav>
          <div>
            <RouterLink to="/">Home</RouterLink>
          </div>
          <div>
            <RouterLink to="/status">Status Board</RouterLink>
          </div>
        </nav>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-lg">
        <RouterView />
      </q-page>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
