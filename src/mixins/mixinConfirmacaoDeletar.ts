import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        confimacaoDeletar(codigo: number) {
            return confirm(`Deseja remover o item ${codigo}?`);
        }
    }
});