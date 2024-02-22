import StatusLista from '@/components/Others/Status/StatusLista.vue';
import StatusEditar from '@/components/Others/Status/StatusEditar.vue';
import StatusCadastro from '@/components/Others/Status/StatusCadastro.vue';
import { PATHS } from '@/enum';

const PATH = PATHS.Status;

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