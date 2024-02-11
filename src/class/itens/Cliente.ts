import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Cliente extends ItemDefault {
    public codigo_status?: number;
    public codigo_cliente_tek?: number;
    public razao?: string;
    public nome_fantasia?: string;
    public email?: string;
    public cnpj_cpf?: string;
    public status?: Status;

    constructor(cliente: Cliente | undefined) {

        if (cliente) {
            super({
                codigo: cliente.codigo,
                data_atualizacao: cliente.data_atualizacao,
                data_criacao: cliente.data_criacao
            });
        } else {
            super(undefined);
        }

        this.codigo_cliente_tek = cliente ? cliente?.codigo_cliente_tek : 0;
        this.razao = cliente ? cliente?.razao : '';
        this.nome_fantasia = cliente ? cliente?.nome_fantasia : '';
        this.email = cliente ? cliente?.email : '';
        this.cnpj_cpf = cliente ? cliente?.cnpj_cpf : '';
        this.codigo_status = cliente ? cliente?.codigo_status : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_cliente_tek = Number(this.codigo_cliente_tek);
        this.codigo_status = Number(this.codigo_status);
    }

}