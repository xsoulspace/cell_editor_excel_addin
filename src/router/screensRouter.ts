import { defineAsyncComponent } from 'vue'
import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: defineAsyncComponent(() => import('@/screens/Home.vue')),
  },
]

export const AppRouter = createRouter({
  history: createMemoryHistory(),
  routes,
})
