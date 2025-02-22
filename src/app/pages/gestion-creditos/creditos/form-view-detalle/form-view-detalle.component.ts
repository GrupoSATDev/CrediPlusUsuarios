import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { ToastAlertsService } from '../../../../core/services/toast-alerts.service';
import { FuseConfirmationService } from '../../../../../@fuse/services/confirmation';
import { EstadosDatosService } from '../../../../core/services/estados-datos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreditosService } from '../../../../core/services/creditos.service';
import { TiposPagosService } from '../../../../core/services/tipos-pagos.service';
import { CapitalInversionService } from '../../../../core/services/capital-inversion.service';
import { EstadoCreditosService } from '../../../../core/services/estado-creditos.service';
import { TasasInteresService } from '../../../../core/services/tasas-interes.service';
import { map, Subscription } from 'rxjs';
import { DateAdapterService } from '../../../../core/services/date-adapter.service';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { CodigosDetalleConsumo } from '../../../../core/enums/detalle-consumo';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDesembolsoComponent } from '../dialog-confirm-desembolso/dialog-confirm-desembolso.component';
import { DetalleConsumoService } from '../../../../core/services/detalle-consumo.service';
import { guardar } from '../../../../core/constant/dialogs';
import { SwalService } from '../../../../core/services/swal.service';
import { FuseAlertComponent } from '../../../../../@fuse/components/alert';
import { AesEncryptionService } from '../../../../core/services/aes-encryption.service';

@Component({
  selector: 'app-form-view-detalle',
  standalone: true,
    imports: [
        CdkScrollable,
        CurrencyPipe,
        DatePipe,
        FormsModule,
        MatButton,
        NgForOf,
        NgIf,
        FuseCardComponent,
        NgClass,
        FuseAlertComponent,
    ],
    providers: [
        { provide: DateAdapter, useClass: DateAdapterService },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        DatePipe,
        CurrencyPipe,
        DecimalPipe,
    ],
  templateUrl: './form-view-detalle.component.html',
  styleUrl: './form-view-detalle.component.scss'
})
export class FormViewDetalleComponent implements OnInit, OnDestroy{
    public toasService = inject(ToastAlertsService);
    public fuseService = inject(FuseConfirmationService);
    public estadosDatosService = inject(EstadosDatosService);
    private activatedRoute = inject(ActivatedRoute);
    private creditoService: CreditosService = inject(CreditosService);
    public detalleConsumoService = inject(DetalleConsumoService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    public subcription$: Subscription;
    public items: any;
    public detalleEmpleado: any;
    private datePipe = inject(DatePipe);
    data = [];
    capital = [];
    estadoCredito = [];
    tasas = [];
    idCredito: string = '';
    public _matDialog = inject(MatDialog);
    private swalService = inject(SwalService);
    public aesEncriptService = inject(AesEncryptionService);
    private currencyPipe = inject(CurrencyPipe);

    ngOnDestroy(): void {
        this.subcription$.unsubscribe();
    }

    onSolicitud() {
        this._matDialog.open(DialogConfirmDesembolsoComponent, {
            data: {
                data: this.items
            },
            disableClose: true,
            panelClass: 'custom-dialog-container'
        })
    }

    onSave(id) {
        const data = {
            idEstado: CodigosDetalleConsumo.APROBADA,
            id: id
        }

        const dialog = this.fuseService.open({
            ...guardar
        });

        dialog.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                this.subcription$ = this.detalleConsumoService.patchConsumo(data).subscribe((response) => {
                    if (response.isExitoso) {
                        this.swalService.ToastAler({
                            icon: 'success',
                            title: 'Registro creado con exito!',
                            timer: 4000,
                        })
                        this.getCredito(this.idCredito);
                    }

                }, error => {
                    this.swalService.ToastAler({
                        icon: 'error',
                        title: 'Ha ocurrido un error al crear el registro!',
                        timer: 4000,
                    })
                })
            }
        })


    }

    onReject(id) {
        const data = {
            idEstado: CodigosDetalleConsumo.RECHAZADA,
            id
        }

        const dialog = this.fuseService.open({
            ...guardar
        });

        dialog.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                this.subcription$ = this.detalleConsumoService.patchConsumo(data).subscribe((response) => {
                    if (response.isExitoso) {
                        this.swalService.ToastAler({
                            icon: 'success',
                            title: 'Registro creado con exito!',
                            timer: 4000,
                        })
                        this.getCredito(this.idCredito);
                    }
                }, error => {
                    this.swalService.ToastAler({
                        icon: 'error',
                        title: 'Ha ocurrido un error al crear el registro!',
                        timer: 4000,
                    })
                })
            }
        })

    }



    ngOnInit(): void {
        this.idCredito = 'Trabajador'
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getCredito(id);
    }

    getCredito(id) {
        this.subcription$ = this.creditoService.getCredito(id).pipe(
        ).subscribe((response) => {
            this.items = response.data;
        })
    }

    protected readonly CodigosDetalleConsumo = CodigosDetalleConsumo;
}
