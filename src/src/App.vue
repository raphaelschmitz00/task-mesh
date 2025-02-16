<script setup lang="ts">
import { reactive } from "vue";
import { RouterView } from "vue-router";
import { routes } from "./pages/router";
import Layout from "@/components/layout/Layout.vue";
import TopBar from "@/components/layout/TopBar.vue";
import Drawer from "@/components/layout/Drawer.vue";
import PageContent from "@/components/layout/PageContent.vue";
import List from "@/components/lists/List.vue";
import ListItem from "@/components/lists/ListItem.vue";

class State {
  drawerIsOpen: boolean = false;
}
const state = reactive(new State());
</script>

<template>
  <Layout view="hhh LpR fff">
    <TopBar @drawer-toggled="state.drawerIsOpen = !state.drawerIsOpen" />

    <Drawer v-model="state.drawerIsOpen">
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
    </Drawer>

    <PageContent>
      <RouterView />
    </PageContent>
  </Layout>
</template>
