import { createRouter, createWebHistory } from 'vue-router'
import OverViewPage from '@/pages/tasks/OverViewPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OverViewPage,
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('../pages/status/StatusBoardPage.vue'),
    },
  ],
})

export default router
