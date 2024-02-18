import { ItemMenu } from "@/interfaces";
import { MODULOS } from "@/enum";

const MODULO = MODULOS.Administrador;

export const menuAdministrador: Array<ItemMenu> = [
    { title: 'Usuários', link: MODULO + 'UsuarioLista' },
    { title: 'Status', link: MODULO + 'StatusLista' }
];