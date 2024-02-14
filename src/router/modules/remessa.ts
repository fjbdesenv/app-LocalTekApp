import RemessasView from '@/views/modules/RemessasView.vue';
import {
    StatusRoutes,
    CnabRoutes,
    BancoRoutes,
    ClienteRoutes,
    AtendimentoRoutes,
    RemessaFinanceiraRoutes,
    UsuarioRoutes /* Remover */
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
            ...BancoRoutes(MODULO),
            ...ClienteRoutes(MODULO),
            ...AtendimentoRoutes(MODULO),
            ...RemessaFinanceiraRoutes(MODULO),
            ...UsuarioRoutes(MODULO)
        ]
    }
];