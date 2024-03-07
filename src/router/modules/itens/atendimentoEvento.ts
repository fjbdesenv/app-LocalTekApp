import AtendimentoEventoLista from '@/components/Others/AtendimentoEvento/AtendimentoEventoLista.vue';
import AtendimentoEventoEditar from '@/components/Others/AtendimentoEvento/AtendimentoEventoEditar.vue';
import AtendimentoEventoCadastro from '@/components/Others/AtendimentoEvento/AtendimentoEventoCadastro.vue';
import { PATHS } from '@/enum';

const PATH = PATHS.AtendimentoEvento;

export const AtendimentoEventoRoutes = (MODULO: string) => [
    {
        /* Eventos do atendimento */
        path: ':codigoAtendimento/eventos',
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: AtendimentoEventoLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: AtendimentoEventoEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: AtendimentoEventoCadastro
            }
        ]
    }
];