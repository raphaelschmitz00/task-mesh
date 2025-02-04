import { createRouter, createWebHistory } from "vue-router";
import StatusBoardPage from "./status/StatusBoardPage.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: StatusBoardPage,
    },
    {
      name: "task-editor",
      path: "/task/:idString",
      props: true,
      component: () => import("./taskEditor/TaskEditorPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./NotFoundPage.vue"),
    },
  ],
});
