const NotFoundView = () => import('@/views/NotFoundView.vue');

export const NotFoundRoutes = [
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFoundView
    }
];