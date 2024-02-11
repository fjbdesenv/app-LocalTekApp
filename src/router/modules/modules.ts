import EspecificidadesView from '@/views/modules/EspecificidadesView.vue';
import { RemessasRoutes } from './remessa/remessa';

export const ModulesRoutes = [
    {
        path: '/modulos',
        name: 'Modulos',
        redirect: { name: 'Home' },
        children: [
            {
                path: 'especificidades',
                name: 'Especificidades',
                alias: '/especificidades',
                component: EspecificidadesView
            },
            ...RemessasRoutes
        ]
    }
];