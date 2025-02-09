import { createRouter, createWebHistory } from "vue-router";
import StatusBoardPage from "./status/StatusBoardPage.vue";

export const routes = {
  home: () => "/",
  meshView: () => "/mesh/",
  taskEditor: (id: number | string) => `/task/${id}`,
};

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home(),
      component: StatusBoardPage,
    },
    {
      path: routes.meshView(),
      component: () => import("./meshView/MeshViewPage.vue"),
    },
    {
      path: routes.taskEditor(":idString"),
      props: true,
      component: () => import("./taskEditor/TaskEditorPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./NotFoundPage.vue"),
    },
  ],
});
