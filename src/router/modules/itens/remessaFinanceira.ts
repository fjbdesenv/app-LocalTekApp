import { PATHS } from '@/enum';

const PATH = PATHS.RemessaFinanceira;
const RemessaFinanceiraLista = () => import('@/components/Others/RemessaFinanceira/RemessaFinanceiraLista.vue');
const RemessaFinanceiraEditar = () => import('@/components/Others/RemessaFinanceira/RemessaFinanceiraEditar.vue');
const RemessaFinanceiraCadastro = () => import('@/components/Others/RemessaFinanceira/RemessaFinanceiraCadastro.vue');

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