import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/views/HomePage.vue'),
      },
    ],
  },
  {
    path: '/cafe/:id',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'CafePage',
        component: () => import('@/views/CafePage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
