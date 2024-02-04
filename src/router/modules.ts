import EspecificidadesView from '../views/modules/EspecificidadesView.vue';
import RemessasView from '../views/modules/RemessasView.vue';

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
            {
                path: 'remessas',
                name: 'Remessas',
                alias: '/remessas',
                component: RemessasView
            }
        ]
    }
];