<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './widgets/PageHeader.vue'

class State {
  drawerIsOpen: boolean = false
}

const state = reactive(new State())
</script>

<template>
  <q-layout
    view="hhh LpR fff"
    container
    style="height: 500px"
    class="shadow-2 rounded-borders"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-header reveal :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn flat @click="state.drawerIsOpen = !state.drawerIsOpen" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="state.drawerIsOpen" :width="200" :breakpoint="700" bordered>
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-drawer side="right" v-model="state.drawerIsOpen" bordered :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <RouterView />
        <p v-for="n in 15" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias
          a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos
          numquam rerum delectus commodi perferendis voluptate?
        </p>

        <q-page-sticky position="top" expand class="bg-primary text-white">
          <q-toolbar>
            <q-btn flat round dense icon="map" />
            <q-toolbar-title>Title</q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
  <PageHeader />
</template>
