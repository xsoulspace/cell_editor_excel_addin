import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: defineAsyncComponent(() => import('@/screens/Home.vue')),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
