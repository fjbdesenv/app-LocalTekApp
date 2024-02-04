import HomeView from '../views/HomeView.vue';
import EspecificidadesView from '../views/modules/EspecificidadesView.vue';
import RemessasView from '../views/modules/RemessasView.vue';

export const HomeRoutes = [
    {
        path: '/',
        redirect: { name: 'Home' }
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
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