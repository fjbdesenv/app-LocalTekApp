import RemessaFinanceiraLista from '@/components/Others/RemessaFinanceira/RemessaFinanceiraLista.vue';
import RemessaFinanceiraEditar from '@/components/Others/RemessaFinanceira/RemessaFinanceiraEditar.vue';
import RemessaFinanceiraCadastro from '@/components/Others/RemessaFinanceira/RemessaFinanceiraCadastro.vue';
import { PATHS } from '@/enum';

const PATH = PATHS.RemessaFinanceira;

export const RemessaFinanceiraRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: RemessaFinanceiraLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: RemessaFinanceiraEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: RemessaFinanceiraCadastro
            },
        ]
    }
];