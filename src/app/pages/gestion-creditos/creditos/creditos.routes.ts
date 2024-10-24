import { Routes } from '@angular/router';
import { FormViewDetalleComponent } from './form-view-detalle/form-view-detalle.component';

export default [
    {
        path: '',
        component: FormViewDetalleComponent
    },
    {
        path: 'view-detalle/:id',
        component: FormViewDetalleComponent
    }
]as Routes;
