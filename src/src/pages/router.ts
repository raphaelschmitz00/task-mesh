import { createRouter, createWebHistory } from "vue-router";
import OverViewPage from "@/pages/tasks/OverViewPage.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: OverViewPage,
    },
    {
      name: "status",
      path: "/status",
      component: () => import("@/pages/status/StatusBoardPage.vue"),
    },
    {
      name: "task-editor",
      path: "/task/:idString",
      props: true,
      component: () => import("@/pages/taskEditor/TaskEditorPage.vue"),
    },
  ],
});
