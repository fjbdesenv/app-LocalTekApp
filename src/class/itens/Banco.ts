import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Banco extends ItemDefault {
    public codigo_status?: number;
    public nome?: string;
    public codigo_banco?: number;
    public codigo_camara?: number;
    public status?: Status;

    constructor(banco: Banco | undefined) {

        if (banco) {
            super({
                codigo: banco.codigo,
                data_atualizacao: banco.data_atualizacao,
                data_criacao: banco.data_criacao
            });
        } else {
            super(undefined);
        }

        this.nome = banco ? banco?.nome : '';
        this.codigo_banco = banco ? banco?.codigo_banco : 0;
        this.codigo_camara = banco ? banco?.codigo_camara : 0;
        this.codigo_status = banco ? banco?.codigo_status : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_banco = Number(this.codigo_banco);
        this.codigo_camara = Number(this.codigo_camara);
        this.codigo_status = Number(this.codigo_status);
    }

}