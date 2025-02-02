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
  <q-layout view="hhh LpR fff">
    <q-header elevated reveal>
      <q-toolbar>
        <q-btn flat @click="state.drawerIsOpen = !state.drawerIsOpen" round dense icon="menu" />
        <q-btn flat round dense icon="img:logo.svg" />
        <q-toolbar-title>Task Mesh</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="state.drawerIsOpen" :width="200" :breakpoint="700" bordered>
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <PageHeader />
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
