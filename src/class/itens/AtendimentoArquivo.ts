import { ItemDefault } from "./ItemDefault";

export class AtendimentoArquivo extends ItemDefault {
    codigo_atendimento?: number;
    nome?: string;
    tipo?: string;
    tamanho?: number;
    arquivo?: File;

    constructor(atendimentoArquivo: AtendimentoArquivo | undefined) {

        if (atendimentoArquivo) {
            super({
                codigo: atendimentoArquivo.codigo,
                data_atualizacao: atendimentoArquivo.data_atualizacao,
                data_criacao: atendimentoArquivo.data_criacao
            });
        } else {
            super(undefined);
        }

        this.codigo_atendimento = atendimentoArquivo ? atendimentoArquivo?.codigo_atendimento : 0;
        this.nome = atendimentoArquivo ? atendimentoArquivo?.nome : '';
        this.tipo = atendimentoArquivo ? atendimentoArquivo?.tipo : '';
        this.tamanho = atendimentoArquivo ? atendimentoArquivo?.tamanho : 0;
        this.arquivo = atendimentoArquivo?.arquivo ? this.arquivo = atendimentoArquivo?.arquivo : undefined;

    }

    async normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_atendimento = Number(this.codigo_atendimento);
        if (this.arquivo) {
            this.nome = this.arquivo.name;
            this.tipo = this.arquivo.type;
            this.tamanho = Number(this.arquivo.size);
        }

        /* Alterar quando for fazer o envio de arquivo*/
        this.arquivo = undefined;
    }
}