import CnabLista from '@/components/Others/Cnab/CnabLista.vue';
import CnabEditar from '@/components/Others/Cnab/CnabEditar.vue';
import CnabCadastro from '@/components/Others/Cnab/CnabCadastro.vue';

export const RemessaCnabRoutes = [
    {
        path: 'cnab',
        redirect: { name: 'CnabLista' },
        children: [
            {
                path: 'lista',
                name: 'RemessaCnabLista',
                component: CnabLista
            },
            {
                path: 'editar/:codigo',
                name: 'RemessaCnabEditar',
                component: CnabEditar
            },
            {
                path: 'cadastro',
                name: 'RemessaCnabCadastrar',
                component: CnabCadastro
            }
        ]
    }
];