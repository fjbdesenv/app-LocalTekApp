import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { HomeRoutes } from './home'
import { ModulesRoutes } from './modules'
import { LoginRoutes } from './login'
import { NotFoundRoutes } from './notFound';

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...ModulesRoutes,
  ...LoginRoutes,
  ...NotFoundRoutes
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
