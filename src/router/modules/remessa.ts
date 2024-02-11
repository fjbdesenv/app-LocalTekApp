import RemessasView from '@/views/modules/RemessasView.vue';
import {
    StatusRoutes,
    CnabRoutes,
    BancoRoutes
} from './itens';

const MODULO = 'Remessa';

export const RemessasRoutes = [
    {
        path: 'remessas',
        name: 'Remessas',
        alias: '/remessas',
        component: RemessasView,
        children: [
            ...StatusRoutes(MODULO),
            ...CnabRoutes(MODULO),
            ...BancoRoutes(MODULO)
        ]
    }
];