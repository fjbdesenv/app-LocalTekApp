import axios from 'axios';
import { Login } from "@/interfaces/Login";
import { LocalStorage } from './LocalStogare';

export class Api {
    private axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/',
    });

    private getToken() {
        const localStogare = new LocalStorage();
        const token = localStogare.token;

        return `Bearer ${token}`;
    }

    private config() {
        return {
            headers: {
                Authorization: this.getToken(),
                "Content-Type": "application/json"
            }
        };
    }

    private configUploadFile() {
        return {
            headers: {
                Authorization: this.getToken(),
                'Content-Type': 'multipart/form-data'
            }
        };
    }

    /* Injeção de metodos padrão */
    private resource(path: string) {
        return {
            findAll: () => {
                return this.axiosInstance.get(path, this.config());
            },
            findOne: (codigo: number) => {
                return this.axiosInstance.get(`${path}/${codigo}`, this.config());
            },
            deleteOne: (codigo: number) => {
                return this.axiosInstance.delete(`${path}/${codigo}`, this.config());
            },
            updateOne: (codigo: number, register: object) => {
                return this.axiosInstance.patch(`${path}/${codigo}`, register, this.config());
            },
            createOne: (register: object) => {
                return this.axiosInstance.post(`${path}`, register, this.config());
            },
        }
    }

    /* Injeção de metodos padrão */
    private resourceFile(path: string) {
        return {
            findAll: () => {
                return this.axiosInstance.get(path, this.config());
            },
            findOne: (codigo: number) => {
                return this.axiosInstance.get(`${path}/${codigo}`, this.config());
            },
            deleteOne: (codigo: number) => {
                return this.axiosInstance.delete(`${path}/${codigo}`, this.config());
            },
            updateOne: (codigo: number, register: object) => {
                return this.axiosInstance.patch(`${path}/${codigo}`, register, this.configUploadFile());
            },
            createOne: (register: object) => {
                return this.axiosInstance.post(`${path}`, register, this.configUploadFile());
            },
            loadFile: (codigo: number) => {
                return this.axiosInstance.get(`${path}/${codigo}/file`, {
                    headers: {
                        Authorization: this.getToken(),
                    },
                    responseType: "blob" /* Retona um blob, impportante */
                });
            },
        }
    }

    /* Variaveis */
    public status;
    public cnab;
    public banco;
    public cliente;
    public remessafinanceira;
    public usuario;
    public atendimento;
    public atendimentoEventos
    public atendimentoArquivos;

    /* Metodos para injeção de funcões de consulta */
    public auth(login: Login) {
        return this.axiosInstance.post('/auth', login);
    }
    public resourceEvento(codigoAtendimento: number) {
        const path = `/atendimentos/${codigoAtendimento}/eventos`;
        return this.resource(path);
    }

    public resourceArquivo(codigoAtendimento: number) {
        const path = `/atendimentos/${codigoAtendimento}/arquivos`;
        return this.resourceFile(path)
    }

    constructor() {
        this.status = this.resource('/status');
        this.cnab = this.resource('/cnabs');
        this.banco = this.resource('/bancos');
        this.cliente = this.resource('/clientes');
        this.usuario = this.resource('/usuarios');
        this.remessafinanceira = this.resource('/remessas-financeiras');
        this.atendimento = this.resource('/atendimentos');
        this.atendimentoEventos = this.resourceEvento(0); /* Chamar resourceEvento(codigo) antes de usar*/
        this.atendimentoArquivos = this.resourceArquivo(0); /* Chamar resourceArquivo(codigo) antes de usar*/
    }
}