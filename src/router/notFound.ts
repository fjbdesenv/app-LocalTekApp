import NotFoundView from '@/views/NotFoundView.vue';

export const NotFoundRoutes = [
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFoundView
    }
];