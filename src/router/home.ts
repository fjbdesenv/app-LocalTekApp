const HomeView = () => import('@/views/HomeView.vue');

export const HomeRoutes = [
    {
        path: '/',
        redirect: { name: 'Home' }
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
    }
];