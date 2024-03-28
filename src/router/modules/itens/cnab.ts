import { PATHS } from '@/enum';

const PATH = PATHS.Cnab;
const CnabLista = () => import('@/components/Others/Cnab/CnabLista.vue');
const CnabEditar = () => import('@/components/Others/Cnab/CnabEditar.vue');
const CnabCadastro = () => import('@/components/Others/Cnab/CnabCadastro.vue');

export const CnabRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: CnabLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: CnabEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: CnabCadastro
            }
        ]
    }
];