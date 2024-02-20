import EspecificidadesView from '@/views/modules/EspecificidadesView.vue';
import { MODULOS } from '@/enum';
import {
    ClienteRoutes,
    AtendimentoRoutes,
} from './itens';


const MODULO = MODULOS.Especificidade;
export const EspecificidadeRoutes = [
    {
        path: 'especificidades',
        name: 'Especificidades',
        alias: '/especificidades',
        component: EspecificidadesView,
        children: [
            ...ClienteRoutes(MODULO),
            ...AtendimentoRoutes(MODULO),
        ]
    }
];