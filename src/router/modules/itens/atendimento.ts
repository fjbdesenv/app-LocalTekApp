import { AtendimentoEventoRoutes } from './atendimentoEvento';
import { AtendimentoArquivoRoutes } from './atendimentoArquivo';
import { PATHS } from '@/enum';

const PATH = PATHS.Atendimento;
const AtendimentoLista = () => import('@/components/Others/Atendimento/AtendimentoLista.vue');
const AtendimentoEditar = () => import('@/components/Others/Atendimento/AtendimentoEditar.vue');
const AtendimentoCadastro = () => import('@/components/Others/Atendimento/AtendimentoCadastro.vue');

export const AtendimentoRoutes = (MODULO: string) => [
    {
        path: PATH.toLocaleLowerCase(),
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: AtendimentoLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: AtendimentoEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: AtendimentoCadastro
            },

            ...AtendimentoEventoRoutes(MODULO),
            ...AtendimentoArquivoRoutes(MODULO)

        ]
    }
];