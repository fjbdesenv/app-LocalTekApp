import RemessasView from '@/views/modules/RemessasView.vue';
import { StatusRoutes } from './itens/status';


export const RemessasRoutes = [
    {
        path: 'remessas',
        name: 'Remessas',
        alias: '/remessas',
        component: RemessasView,
        children: [
            ...StatusRoutes
        ]
    }
];