export class ItemDefault {
    codigo?: number;
    data_criacao?: string;
    data_atualizacao?: string;

    constructor(item: ItemDefault | undefined) {
        this.codigo = item ? item.codigo : 0;
        this.data_atualizacao = item ? item.data_atualizacao : undefined;
        this.data_criacao = item ? item.data_criacao : undefined;
    }
}