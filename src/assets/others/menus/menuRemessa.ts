import { ItemMenu } from "@/interfaces";

const MODULO = 'Remessa';

export const menuRemessa: Array<ItemMenu> = [
    { title: 'Remessa Financeira', link: MODULO + 'RemessaFinanceiraLista' },
    { title: 'Atendimentos', link: MODULO + 'AtendimentoLista' },
    { title: 'Clientes', link: MODULO + 'ClienteLista' },
    { title: 'Bancos', link: MODULO + 'BancoLista' },
    { title: 'Cnab', link: MODULO + 'CnabLista' },
    { title: 'Status', link: MODULO + 'StatusLista' }
];