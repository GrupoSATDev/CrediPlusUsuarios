/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps.gestion-creditos',
        title: 'Solicitudes',
        type: 'basic',
        icon: 'attach_money',
        link: '/pages/gestion-creditos/solicitudes',
    },
    {
        id: 'apps.gestion-creditos',
        title: 'Mi crédito',
        type: 'basic',
        icon: 'request_quote',
        link: '/pages/gestion-creditos/creditos',
    },
    {
        id: 'apps.gestion-cobros',
        title: 'Pagos pendientes',
        type : 'basic',
        icon: 'request_quote',
        link: '/pages/gestion-cobros/cobros',
    },
   /*{
        id: 'apps.configuraciones',
        title: 'Configuraciones',
        type: 'collapsable',
        icon: 'settings',
        children: [
            {
                id: 'apps.empresas.maestras',
                title: 'Empresas maestras',
                type: 'basic',
                link: '/pages/configuracion/empresas-maestras',
            },
        ],
    },*/



];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
];
