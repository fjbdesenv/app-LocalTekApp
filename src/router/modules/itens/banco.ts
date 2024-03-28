import { PATHS } from '@/enum';

const PATH = PATHS.Banco;
const BancoLista = () => import('@/components/Others/Banco/BancoLista.vue');
const BancoEditar = () => import('@/components/Others/Banco/BancoEditar.vue');
const BancoCadastro = () => import( '@/components/Others/Banco/BancoCadastro.vue');

export const BancoRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: BancoLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: BancoEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: BancoCadastro
            }
        ]
    }
];