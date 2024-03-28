import { PATHS } from '@/enum';

const PATH = PATHS.AtendimentoEvento;
const AtendimentoEventoLista = () => import('@/components/Others/AtendimentoEvento/AtendimentoEventoLista.vue');
const AtendimentoEventoEditar = () => import('@/components/Others/AtendimentoEvento/AtendimentoEventoEditar.vue');
const AtendimentoEventoCadastro = () => import('@/components/Others/AtendimentoEvento/AtendimentoEventoCadastro.vue');

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