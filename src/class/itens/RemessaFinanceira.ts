import { Atendimento } from "./Atendimento";
import { Banco } from "./Banco";
import { Cnab } from "./Cnab";
import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class RemessaFinanceira extends ItemDefault {
    codigo_status?: number;
    codigo_banco?: number;
    codigo_atendimento?: number;
    codigo_cnab?: number;
    tipo_remessa?: number;
    agencia?: number;
    digito_agencia?: number;
    conta_corrente?: number;
    digito_conta_corrente?: number;
    carteira?: string;
    variacao?: string;
    convenio?: string;
    cedente?: string;
    contrato?: string;
    titular?: string;
    titular_cnpj_cpf?: number;
    sacador_avalista?: string;
    sacador_avalista_cnpj_cpf?: number;
    juros?: number;
    multa?: number;
    protesto?: boolean;
    protesto_dias?: number;
    pix?: boolean;
    emitente?: number;

    atendimento?: Atendimento;
    cnab?: Cnab;
    banco?: Banco;
    status?: Status;


    constructor(remessaFinanceira: RemessaFinanceira | undefined) {

        if (remessaFinanceira) {
            super({
                codigo: remessaFinanceira.codigo,
                data_atualizacao: remessaFinanceira.data_atualizacao,
                data_criacao: remessaFinanceira.data_criacao
            });
        } else {
            super(undefined);
        }

        this.codigo_status = remessaFinanceira ? Number(remessaFinanceira?.codigo_status) : 0;
        this.codigo_banco = remessaFinanceira ? Number(remessaFinanceira?.codigo_banco) : 0;
        this.codigo_atendimento = remessaFinanceira ? Number(remessaFinanceira?.codigo_atendimento) : 0;
        this.codigo_cnab = remessaFinanceira ? Number(remessaFinanceira?.codigo_cnab) : 0;
        this.tipo_remessa = remessaFinanceira ? Number(remessaFinanceira?.tipo_remessa) : 0;
        this.agencia = remessaFinanceira ? Number(remessaFinanceira?.agencia) : 0;
        this.digito_agencia = remessaFinanceira ? Number(remessaFinanceira?.digito_agencia) : 0;
        this.conta_corrente = remessaFinanceira ? Number(remessaFinanceira?.conta_corrente) : 0;
        this.digito_conta_corrente = remessaFinanceira ? Number(remessaFinanceira?.digito_conta_corrente) : 0;
        this.carteira = remessaFinanceira ? remessaFinanceira?.carteira : '';
        this.variacao = remessaFinanceira ? remessaFinanceira?.variacao : '';
        this.convenio = remessaFinanceira ? remessaFinanceira?.convenio : '';
        this.cedente = remessaFinanceira ? remessaFinanceira?.cedente : '';
        this.contrato = remessaFinanceira ? remessaFinanceira?.contrato : '';
        this.titular = remessaFinanceira ? remessaFinanceira?.titular : '';
        this.titular_cnpj_cpf = remessaFinanceira ? Number(remessaFinanceira?.titular_cnpj_cpf) : 0;
        this.sacador_avalista = remessaFinanceira ? remessaFinanceira?.sacador_avalista : '';
        this.sacador_avalista_cnpj_cpf = remessaFinanceira ? Number(remessaFinanceira?.sacador_avalista_cnpj_cpf) : 0;
        this.juros = remessaFinanceira ? Number(remessaFinanceira?.juros) : 0;
        this.multa = remessaFinanceira ? Number(remessaFinanceira?.multa) : 0;
        this.protesto = Boolean(remessaFinanceira?.protesto);
        this.protesto_dias = remessaFinanceira ? Number(remessaFinanceira?.protesto_dias) : 0;
        this.pix = Boolean(remessaFinanceira?.pix);
        this.emitente = remessaFinanceira ? Number(remessaFinanceira?.emitente) : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.codigo_status = Number(this.codigo_status);
        this.codigo_banco = Number(this.codigo_banco);
        this.codigo_atendimento = Number(this.codigo_atendimento);
        this.codigo_cnab = Number(this.codigo_cnab);
        this.tipo_remessa = Number(this.tipo_remessa);
        this.agencia = Number(this.agencia);
        this.digito_agencia = Number(this.digito_agencia);
        this.conta_corrente = Number(this.conta_corrente);
        this.digito_conta_corrente = Number(this.digito_conta_corrente);
        this.titular_cnpj_cpf = Number(this.titular_cnpj_cpf);
        this.sacador_avalista_cnpj_cpf = Number(this.sacador_avalista_cnpj_cpf);

        this.juros = Number(this.juros);
        this.multa = Number(this.multa);
        this.protesto = Boolean(this.protesto);
        this.protesto_dias = Number(this.protesto_dias);
        this.pix = Boolean(this.pix);
        this.emitente = Number(this.emitente);
    }
}