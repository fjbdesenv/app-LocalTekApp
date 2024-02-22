import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class AtendimentoEvento extends ItemDefault {
    codigo_status?: number;
    codigo_atendimento?: number;
    descricao?: string;
    status?: Status;
    data?: string;

    constructor(atendimentoEvento: AtendimentoEvento | undefined) {

        if (atendimentoEvento) {
            super({
                codigo: atendimentoEvento.codigo,
                data_atualizacao: atendimentoEvento.data_atualizacao,
                data_criacao: atendimentoEvento.data_criacao
            });
        } else {
            super(undefined);
        }

        this.codigo_status = atendimentoEvento ? atendimentoEvento?.codigo_status : 0;
        this.codigo_atendimento = atendimentoEvento ? atendimentoEvento?.codigo_atendimento : 0;
        this.descricao = atendimentoEvento ? atendimentoEvento?.descricao : '';
        this.data = atendimentoEvento ? atendimentoEvento?.data : '';
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_atendimento = Number(this.codigo_atendimento);
        this.codigo_status = Number(this.codigo_status);
    }
}