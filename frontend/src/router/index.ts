import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import ImportView from '../views/ImportView.vue'
import ExportView from '@/views/ExportView.vue'
import DataView from '@/views/DataView.vue'
import { useUserStore } from './../stores/user'
import { isUserAuthentificated } from './../services/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/import',
    name: 'import',
    component: ImportView,
    meta: { requiresAuth: true }
  },
  {
    path: '/export',
    name: 'export',
    component: ExportView,
    meta: { requiresAuth: true }
  },
  {
    path: '/data',
    name: 'data',
    component: DataView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if(!userStore.isLoggedIn) {
    const isAuthentificated = await isUserAuthentificated();
    await userStore.setLoggedInStatus(isAuthentificated);
  }

  if (to.name === 'login' && userStore.isLoggedIn) {
    next({
      path: '/',
    })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
