import AtendimentoArquivoLista from '@/components/Others/AtendimentoArquivo/AtendimentoArquivoLista.vue';
import AtendimentoArquivoEditar from '@/components/Others/AtendimentoArquivo/AtendimentoArquivoEditar.vue';
import AtendimentoArquivoCadastro from '@/components/Others/AtendimentoArquivo/AtendimentoArquivoCadastro.vue';
import { PATHS } from '@/enum';

const PATH = PATHS.AtendimentoArquivo;

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