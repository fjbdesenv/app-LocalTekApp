import ClienteLista from '@/components/Others/Cliente/ClienteLista.vue';
import ClienteEditar from '@/components/Others/Cliente/ClienteEditar.vue';
import ClienteCadastro from '@/components/Others/Cliente/ClienteCadastro.vue';
import { PATHS } from '@/enum';

const PATH = PATHS.Cliente;

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