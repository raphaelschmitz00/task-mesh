import { createRouter, createWebHistory } from "vue-router";
import StatusBoardPage from "./status/StatusBoardPage.vue";

export const routes = {
  home: () => "/",
  meshView: () => "/mesh/",
  editTask: (id: number | string) => `/task/${id}`,
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
      path: routes.editTask(":id"),
      props: true,
      component: () => import("./editTask/EditTaskPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./NotFoundPage.vue"),
    },
  ],
});
