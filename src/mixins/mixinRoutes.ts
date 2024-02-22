import { Rotas } from '@/class/rotas';
import { PATHS } from '@/enum';
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        rotas: new Rotas(),
        path: ''
    }),
    methods: {
        getRouteCadastro(modulo: string, path: string): string {
            //Remover espaços
            path = path.replace(' ', '');

            return modulo + path + 'Cadastrar';
        },
        getRouteEdicao(modulo: string, path: string): string {
            //Remover espaços
            path = path.replace(' ', '');

            return modulo + path + 'Editar';
        },
        getRouteLista(modulo: string, path: string): string {
            //Remover espaços
            path = path.replace(' ', '');

            return modulo + path + 'Lista';
        }
    }
});