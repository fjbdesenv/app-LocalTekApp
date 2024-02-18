import RemessasView from '@/views/modules/RemessasView.vue';
import { MODULOS } from '@/enum';
import {
    CnabRoutes,
    BancoRoutes,
    ClienteRoutes,
    AtendimentoRoutes,
    RemessaFinanceiraRoutes
} from './itens';

const MODULO = MODULOS.Remessa;
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