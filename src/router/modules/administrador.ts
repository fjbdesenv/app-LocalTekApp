import { MODULOS } from '@/enum';
import {
    StatusRoutes,
    UsuarioRoutes
} from './itens';

const MODULO = MODULOS.Administrador;
const AdministradorView = () => import('@/views/modules/EspecificidadesView.vue');

const AdministradorRoutes = [
    {
        path: 'administrador',
        name: 'Administrador',
        alias: '/administrador',
        component: AdministradorView,
        children: [
            ...StatusRoutes(MODULO),
            ...UsuarioRoutes(MODULO),
        ]
    }
];

export { AdministradorRoutes };