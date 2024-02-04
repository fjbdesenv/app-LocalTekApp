import axios from 'axios';
import { Login } from "@/interfaces/Login";
import { LocalStorage } from './LocalStogare';

export class Api {
    private axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/',
    });

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

    private getToken() {
        const localStogare = new LocalStorage();
        const token = localStogare.token;

        return `Bearer ${token}`;
    }

    private config() {
        return {
            headers:
            {
                Authorization: this.getToken(),
                "Content-Type": "application/json"
            }
        };
    }

    public status;

    constructor() {
        this.status = this.resource('/status');
    }

    public auth(login: Login) {
        return this.axiosInstance.post('/auth', login);
    }

}