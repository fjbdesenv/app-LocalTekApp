import { createStore } from 'vuex';

export const Store = createStore({
    state: {
        selected: {
            status: 0,
            cliente: 0,
            banco: 0,
            cnab: 0,
            nivel: 2,
            protesto: false,
            pix: false
        }
    },
    getters: {
        getSelectedStatus: (status): number => status.selected.status,
        getSelectedCliente: (status): number => status.selected.cliente,
        getSelectedBanco: (status): number => status.selected.banco,
        getSelectedCnab: (status): number => status.selected.cnab,
        getSelectedNivel: (status): number => status.selected.nivel,
        getSelectedProtesto: (status): boolean => status.selected.protesto,
        getSelectedPix: (status): boolean => status.selected.pix,
    },
    mutations: {
        setSelectedStatus: (status, value: number) => status.selected.status = value,
        setSelectedCliente: (status, value: number) => status.selected.cliente = value,
        setSelectedBanco: (status, value: number) => status.selected.banco = value,
        setSelectedCnab: (status, value: number) => status.selected.cnab = value,
        setSelectedNivel: (status, value: number) => status.selected.nivel = value,
        setSelectedProtesto: (status, value: boolean) => status.selected.protesto = value,
        setSelectedPix: (status, value: boolean) => status.selected.pix = value,
    },
    actions: {
    },
    modules: {
    }
})
