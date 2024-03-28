import { PATHS } from '@/enum';

const PATH = PATHS.Cliente;
const ClienteLista = () => import('@/components/Others/Cliente/ClienteLista.vue');
const ClienteEditar = () => import('@/components/Others/Cliente/ClienteEditar.vue');
const ClienteCadastro = () => import('@/components/Others/Cliente/ClienteCadastro.vue');

export const ClienteRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: ClienteLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: ClienteEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: ClienteCadastro
            }
        ]
    }
];