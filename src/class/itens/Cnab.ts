import { ItemDefault } from "./ItemDefault";
import { Status } from "./Status";

export class Cnab extends ItemDefault {
    codigo_status?: number;
    quantidade_linhas?: number;
    descricao?: string;
    status?: Status;
}