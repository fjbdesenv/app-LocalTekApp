import CnabLista from '@/components/Others/Cnab/CnabLista.vue';
import CnabEditar from '@/components/Others/Cnab/CnabEditar.vue';
import CnabCadastro from '@/components/Others/Cnab/CnabCadastro.vue';

const PATH = 'Cnab';

export const CnabRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: CnabLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: CnabEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: CnabCadastro
            }
        ]
    }
];