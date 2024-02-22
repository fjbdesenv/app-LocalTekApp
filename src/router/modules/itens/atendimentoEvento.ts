import AtendimentoEventoLista from '@/components/Others/AtendimentoEvento/AtendimentoEventoLista.vue';
import AtendimentoEventoEditar from '@/components/Others/AtendimentoEvento/AtendimentoEventoEditar.vue';
import AtendimentoEventoCadastro from '@/components/Others/AtendimentoEvento/AtendimentoEventoCadastro.vue';
import { PATHS } from '@/enum';

const PATH_EVENTOS = PATHS.AtendimentoEvento;

export const AtendimentoEventoRoutes = (MODULO: string) => [
    {
        /* Eventos do atendimento */
        path: ':codigoAtendimento/eventos',
        redirect: { name: MODULO + PATH_EVENTOS + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH_EVENTOS + 'Lista',
                component: AtendimentoEventoLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH_EVENTOS + 'Editar',
                component: AtendimentoEventoEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH_EVENTOS + 'Cadastrar',
                component: AtendimentoEventoCadastro
            }
        ]
    }
];