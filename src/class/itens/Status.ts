import { ItemDefault } from "./ItemDefault";

export class Status extends ItemDefault {
    descricao?: string;
    tipo?: number;

    constructor(status: Status | undefined) {

        if (status) {
            super({
                codigo: status.codigo,
                data_atualizacao: status.data_atualizacao,
                data_criacao: status.data_criacao
            });
        } else {
            super(undefined);
        }

        this.descricao = status ? status?.descricao : '';
        this.tipo = status ? status?.tipo : 1;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.tipo = Number(this.tipo);
    }
}