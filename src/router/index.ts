import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { HomeRoutes } from './home'
import { ModulesRoutes } from './modules/modules'
import { LoginRoutes } from './login'
import { NotFoundRoutes } from './notFound';
import { LocalStorage } from '@/class';

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

// Validar acesso as rotas
router.beforeEach((to, from, next) => {
  const localStorage = new LocalStorage();

  if (!localStorage.token && to.name != 'NotFound' && to.name != 'Login') {
    return next({ name: "Login" });
  } else {
    return next();
  }
});

export default router
