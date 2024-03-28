import { PATHS } from '@/enum';

const PATH = PATHS.Status;
const StatusLista = () => import('@/components/Others/Status/StatusLista.vue');
const StatusEditar = () => import('@/components/Others/Status/StatusEditar.vue');
const StatusCadastro = () => import('@/components/Others/Status/StatusCadastro.vue');

export const StatusRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: StatusLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: StatusEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: StatusCadastro
            }
        ]
    }
];