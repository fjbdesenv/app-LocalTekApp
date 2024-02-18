import AdministradorView from '@/views/modules/AdministradorView.vue';
import { MODULOS } from '@/enum';
import {
    StatusRoutes,
    UsuarioRoutes
} from './itens';

const MODULO = MODULOS.Administrador;
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