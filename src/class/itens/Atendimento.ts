import { ItemDefault } from "./ItemDefault";
import { Cliente } from "./Cliente";
import { Status } from "./Status";

export class Atendimento extends ItemDefault {
    codigo_status?: number;
    codigo_atendimento_tek?: number;
    codigo_cliente?: number;
    status?: Status;
    cliente?: Cliente;

    constructor(atendimento: Atendimento | undefined) {

        if (atendimento) {
            super({
                codigo: atendimento.codigo,
                data_atualizacao: atendimento.data_atualizacao,
                data_criacao: atendimento.data_criacao
            });
        } else {
            super(undefined);
        }

        this.codigo_atendimento_tek = atendimento ? atendimento?.codigo_atendimento_tek : 0;
        this.codigo_status = atendimento ? atendimento?.codigo_status : 0;
        this.codigo_cliente = atendimento ? atendimento?.codigo_cliente : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_atendimento_tek = Number(this.codigo_atendimento_tek);
        this.codigo_status = Number(this.codigo_status);
        this.codigo_cliente = Number(this.codigo_cliente);
    }
}