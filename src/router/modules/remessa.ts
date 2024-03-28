import { MODULOS } from '@/enum';
import {
    CnabRoutes,
    BancoRoutes,
    ClienteRoutes,
    AtendimentoRoutes,
    RemessaFinanceiraRoutes
} from './itens';

const MODULO = MODULOS.Remessa;
const RemessasView = () => import('@/views/modules/RemessasView.vue');

export const RemessasRoutes = [
    {
        path: 'remessas',
        name: 'Remessas',
        alias: '/remessas',
        component: RemessasView,
        children: [
            ...CnabRoutes(MODULO),
            ...BancoRoutes(MODULO),
            ...ClienteRoutes(MODULO),
            ...AtendimentoRoutes(MODULO),
            ...RemessaFinanceiraRoutes(MODULO),
        ]
    }
];