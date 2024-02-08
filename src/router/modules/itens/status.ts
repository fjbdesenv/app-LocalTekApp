import StatusLista from '@/components/Others/Status/StatusLista.vue';
import StatusEditar from '@/components/Others/Status/StatusEditar.vue';
import StatusCadastro from '@/components/Others/Status/StatusCadastro.vue';

export const StatusRoutes = [
    {
        path: 'status',
        redirect: { name: 'StatusLista' },
        children: [
            {
                path: 'lista',
                name: 'StatusLista',
                component: StatusLista
            },
            {
                path: 'editar/:codigo',
                name: 'StatusEditar',
                component: StatusEditar
            },
            {
                path: 'cadastro',
                name: 'StatusCadastrar',
                component: StatusCadastro
            }
        ]
    }
];