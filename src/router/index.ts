import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw } from 'vue-router'
import { LAYOUT_NAMES } from '@/constants/config'
import { loadLayoutMiddleware } from '@/router/middleware/load-layout.middleware'
import { auth } from '@/main'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth-page',
    component: () => import('@/pages/AuthPage.vue'),
    meta: {
      layoutComponent: LAYOUT_NAMES.AUTH
    } as RouteMeta
  },
  {
    path: '/dashboard-page',
    name: 'dashboard-page',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: {
      requiresAuth: true,
      layoutComponent: LAYOUT_NAMES.DEFAULT
    } as RouteMeta
  },
  {
    path: '/spending-page',
    name: 'spending-page',
    component: () => import('@/pages/SpendingPage.vue'),
    meta: {
      requiresAuth: true,
      layoutComponent: LAYOUT_NAMES.DEFAULT
    } as RouteMeta
  },
  {
    path: '/settings-page',
    name: 'settings-page',
    component: () => import('@/pages/SettingsPage.vue'),
    meta: {
      requiresAuth: true,
      layoutComponent: LAYOUT_NAMES.DEFAULT
    } as RouteMeta
  },
  {
    path: '/cool-tricks',
    name: 'cool-tricks',
    component: () => import('@/pages/CoolTricks.vue'),
    meta: {
      requiresAuth: true,
      layoutComponent: LAYOUT_NAMES.DEFAULT
    } as RouteMeta
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  await loadLayoutMiddleware(to)

  if (to.matched.some((path) => path.meta.requiredAuth) && !auth.currentUser) {
    console.log('beforeEach redirect to /')
    next('/')
  }
  next()
})

export default router
