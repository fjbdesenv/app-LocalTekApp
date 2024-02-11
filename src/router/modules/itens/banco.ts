import BancoLista from '@/components/Others/Banco/BancoLista.vue';
import BancoEditar from '@/components/Others/Banco/BancoEditar.vue';
import BancoCadastro from '@/components/Others/Banco/BancoCadastro.vue';

const PATH = 'Banco';

export const BancoRoutes = (MODULO: String) => [
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