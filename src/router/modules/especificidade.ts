import { MODULOS } from '@/enum';
import {
    ClienteRoutes,
    AtendimentoRoutes,
} from './itens';

const MODULO = MODULOS.Especificidade;
const EspecificidadesView = () => import('@/views/modules/EspecificidadesView.vue');

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