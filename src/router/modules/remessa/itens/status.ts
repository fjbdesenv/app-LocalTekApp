import StatusLista from '@/components/Others/Status/StatusLista.vue';
import StatusEditar from '@/components/Others/Status/StatusEditar.vue';
import StatusCadastro from '@/components/Others/Status/StatusCadastro.vue';

export const RemessaStatusRoutes = [
    {
        path: 'status',
        redirect: { name: 'RemessaStatusLista' },
        children: [
            {
                path: 'lista',
                name: 'RemessaStatusLista',
                component: StatusLista
            },
            {
                path: 'editar/:codigo',
                name: 'RemessaStatusEditar',
                component: StatusEditar
            },
            {
                path: 'cadastro',
                name: 'RemessaStatusCadastrar',
                component: StatusCadastro
            }
        ]
    }
];