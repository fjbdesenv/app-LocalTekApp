import { PATHS } from '@/enum';

const PATH = PATHS.Usuario;
const UsuarioLista = () => import('@/components/Others/Usuario/UsuarioLista.vue');
const UsuarioEditar = () => import('@/components/Others/Usuario/UsuarioEditar.vue');
const UsuarioCadastro = () => import('@/components/Others/Usuario/UsuarioCadastro.vue');

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