import { ItemMenu } from "@/interfaces";
import { MODULOS } from "@/enum";

const MODULO = MODULOS.Especificidade;

export const menuEspecificidade: Array<ItemMenu> = [
    { title: 'Atendimentos', link: MODULO + 'AtendimentoLista' },
    { title: 'Clientes', link: MODULO + 'ClienteLista' },
];