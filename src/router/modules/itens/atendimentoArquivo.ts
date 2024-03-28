import { PATHS } from '@/enum';

const PATH = PATHS.AtendimentoArquivo;
const AtendimentoArquivoLista = () => import('@/components/Others/AtendimentoArquivo/AtendimentoArquivoLista.vue');
const AtendimentoArquivoEditar = () => import('@/components/Others/AtendimentoArquivo/AtendimentoArquivoEditar.vue');
const AtendimentoArquivoCadastro = () => import('@/components/Others/AtendimentoArquivo/AtendimentoArquivoCadastro.vue');

export const AtendimentoArquivoRoutes = (MODULO: string) => [
    {
        /* Arquivos do atendimento */
        path: ':codigoAtendimento/arquivos',
        redirect: { name: MODULO + PATH + 'Lista' },
        children: [
            {
                path: 'lista',
                name: MODULO + PATH + 'Lista',
                component: AtendimentoArquivoLista
            },
            {
                path: 'editar/:codigo',
                name: MODULO + PATH + 'Editar',
                component: AtendimentoArquivoEditar
            },
            {
                path: 'cadastro',
                name: MODULO + PATH + 'Cadastrar',
                component: AtendimentoArquivoCadastro
            }
        ]
    }
];