import { RemessasRoutes } from './remessa';
import { EspecificidadeRoutes } from './especificidade';
import { AdministradorRoutes } from './administrador';

export const ModulesRoutes = [
    {
        path: '/modulos',
        name: 'Modulos',
        redirect: { name: 'Home' },
        children: [
            ...RemessasRoutes,
            ...EspecificidadeRoutes,
            ...AdministradorRoutes,
        ]
    }
];