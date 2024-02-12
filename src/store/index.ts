import { createStore } from 'vuex';

export const Store = createStore({
    state: {
        selected: {
            status: 0,
            cliente: 0,
        }
    },
    getters: {
        getSelectedStatus: (status): number => status.selected.status,
        getSelectedCliente: (status): number => status.selected.cliente
    },
    mutations: {
        setSelectedStatus: (status, value: number) => status.selected.status = value,
        setSelectedCliente: (status, value: number) => status.selected.cliente = value
    },
    actions: {
    },
    modules: {
    }
})
