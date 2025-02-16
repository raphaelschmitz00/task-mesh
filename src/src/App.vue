<script setup lang="ts">
import { reactive } from "vue";
import { RouterView, useRouter } from "vue-router";
import { routes } from "./pages/router";
import List from "./components/lists/List.vue";
import ListItem from "./components/lists/ListItem.vue";

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
          :icon="`img:${basePath}logo.svg`"
          color="white"
          round
          unelevated
          @click="router.push(routes.home())"
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
          <List>
            <ListItem>
              <RouterLink :to="routes.home()">Status Board</RouterLink>
            </ListItem>
            <ListItem>
              <RouterLink :to="routes.meshView()">Mesh View</RouterLink>
            </ListItem>
          </List>
        </nav>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-lg">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
