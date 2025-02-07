import { Routes } from '@angular/router';
import { FormViewDetalleComponent } from './form-view-detalle/form-view-detalle.component';
import { CreditosMainComponent } from './creditos-main/creditos-main.component';
import { MisCreditosComponent } from './mis-creditos/mis-creditos.component';

export default [
    {
        path: '',
        component: MisCreditosComponent
    },
    {
        path: 'view-detalle/:id',
        component: FormViewDetalleComponent
    }
]as Routes;
