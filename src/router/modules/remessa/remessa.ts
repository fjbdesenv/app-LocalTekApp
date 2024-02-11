import RemessasView from '@/views/modules/RemessasView.vue';
import {
    RemessaStatusRoutes,
    RemessaCnabRoutes
} from './itens';


export const RemessasRoutes = [
    {
        path: 'remessas',
        name: 'Remessas',
        alias: '/remessas',
        component: RemessasView,
        children: [
            ...RemessaStatusRoutes,
            ...RemessaCnabRoutes
        ]
    }
];