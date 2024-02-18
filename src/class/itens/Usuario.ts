import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Usuario extends ItemDefault {
    codigo_status?: number;
    nome?: string;
    email?: string;
    senha?: string;
    nivel?: number;
    status?: Status;
    modulos?: string;

    constructor(usuario: Usuario | undefined) {

        if (usuario) {
            super({
                codigo: usuario.codigo,
                data_atualizacao: usuario.data_atualizacao,
                data_criacao: usuario.data_criacao
            });
        } else {
            super(undefined);
        }

        this.nome = usuario ? usuario?.nome : undefined;
        this.email = usuario ? usuario?.email : undefined;
        this.senha = usuario ? usuario?.senha : undefined;
        this.nivel = usuario ? usuario?.nivel : 2;
        this.modulos = usuario ? usuario?.modulos : '';
        this.codigo_status = usuario ? usuario?.codigo_status : 0;
    }

    normalizarSaida() {
        /* Ajusta dados para evitar erros no servidor */

        this.codigo = undefined;
        this.data_criacao = undefined;
        this.data_atualizacao = undefined;

        this.nivel = Number(this.nivel);
        this.codigo_status = Number(this.codigo_status);
    }

    normalizarModulos(modulos: Array<String>) {
        this.modulos = modulos.join('|');
        if (this.modulos.length > 0) this.modulos = this.modulos.substring(1);
    }
}