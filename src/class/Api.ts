import axios from 'axios';
import { Login } from "@/interfaces/Login";


export class Api {
    private axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/',
    });

    public auth(login: Login) {
        return this.axiosInstance.post('/auth', login);
    }

    public usuario = {
        path: '/usuario',
        FindOne: () => {
            return this.axiosInstance.get(this.usuario.path);
        }
    }
}