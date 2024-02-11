import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Cnab extends ItemDefault {
    codigo_status?: number;
    quantidade_linhas?: number;
    descricao?: string;
    status?: Status;

    constructor(cnab: Cnab | undefined) {

        if (cnab) {
            super({
                codigo: cnab.codigo,
                data_atualizacao: cnab.data_atualizacao,
                data_criacao: cnab.data_criacao
            });
        } else {
            super(undefined);
        }

        this.descricao = cnab ? cnab?.descricao : '';
        this.quantidade_linhas = cnab ? cnab?.quantidade_linhas : 0;
        this.codigo_status = cnab ? cnab?.codigo_status : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;
        
        this.quantidade_linhas = Number(this.quantidade_linhas);
        this.codigo_status = Number(this.codigo_status);
    }
}