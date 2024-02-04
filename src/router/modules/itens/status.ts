import StatusLista from '@/components/Others/Status/StatusLista.vue';

export const StatusRoutes = [
    {
        path: 'status',
        redirect: { name: 'StatusLista' },
        children: [
            {
                path: 'lista',
                name: 'StatusLista',
                component: StatusLista
            }
        ]
    }
];