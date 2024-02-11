import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Banco extends ItemDefault {
    codigo_status?: number;
    codigo_banco?: number;
    codigo_camara?: string;
    nome?: string;
    status?: Status;
}