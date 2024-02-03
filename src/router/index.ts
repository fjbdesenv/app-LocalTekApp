import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import MudulesView from '../views/MudulesView.vue'
import EspecificidadesView from '../views/modules/EspecificidadesView.vue'
import RemessasView from '../views/modules/RemessasView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: 'especificidades',
        name: 'Especificidades',
        component: EspecificidadesView
      },
      {
        path: 'remessas',
        name: 'Remessas',
        component: RemessasView
      }
    ]
  },
  {
    path: '/modulos',
    name: 'Modulos',
    component: MudulesView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
