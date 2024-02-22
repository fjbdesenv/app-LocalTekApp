import AtendimentoLista from '@/components/Others/Atendimento/AtendimentoLista.vue';
import AtendimentoEditar from '@/components/Others/Atendimento/AtendimentoEditar.vue';
import AtendimentoCadastro from '@/components/Others/Atendimento/AtendimentoCadastro.vue';
import { PATHS } from '@/enum';
import { AtendimentoEventoRoutes } from './atendimentoEvento';

const PATH = PATHS.Atendimento;
const PATH_EVENTOS = PATHS.AtendimentoEvento;

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

            ...AtendimentoEventoRoutes(MODULO)

        ]
    }
];