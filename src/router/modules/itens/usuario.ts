import UsuarioLista from '@/components/Others/Usuario/UsuarioLista.vue';
import UsuarioEditar from '@/components/Others/Usuario/UsuarioEditar.vue';
import UsuarioCadastro from '@/components/Others/Usuario/UsuarioCadastro.vue';

const PATH = 'Usuario';

export const UsuarioRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: UsuarioLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: UsuarioEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: UsuarioCadastro
            }
        ]
    }
];