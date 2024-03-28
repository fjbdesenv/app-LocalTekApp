const LoginView = () => import('@/views/LoginView.vue');

export const LoginRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }
];