import { ItemMenu } from "@/interfaces";

const MODULO = 'Remessa';

export const menuRemessaItens: Array<ItemMenu> = [
    { title: 'Conf. Remessa', link: 'Home' },
    { title: 'Atendimentos', link: 'Home' },
    { title: 'Clientes', link: MODULO + 'ClienteLista' },
    { title: 'Bancos', link: MODULO + 'BancoLista' },
    { title: 'Cnab', link: MODULO + 'CnabLista' },
    { title: 'Status', link: MODULO + 'StatusLista' }
]