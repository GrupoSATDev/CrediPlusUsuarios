import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '../../../../../@fuse/services/confirmation';
import { EstadosDatosService } from '../../../../core/services/estados-datos.service';
import { ToastAlertsService } from '../../../../core/services/toast-alerts.service';
import { confirmarGuardado, guardar } from '../../../../core/constant/dialogs';
import { SolicitudesService } from '../../../../core/services/solicitudes.service';
import { MatStep, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { EmpleadosService } from '../../../../core/services/empleados.service';
import { filter, map, Observable, of, pipe, Subscription, tap } from 'rxjs';
import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';
import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { IConfig, NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { SwalService } from '../../../../core/services/swal.service';
import { TipoSolicitudesService } from '../../../../core/services/tipo-solicitudes.service';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@Component({
  selector: 'app-form-solicitudes',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatStepper,
        MatStep,
        MatStepperPrevious,
        MatStepperNext,
        TerminosCondicionesComponent,
        NgClass,
        NgIf,
        MatError,
        NgxMaskDirective,
        AsyncPipe,
        MatOption,
        MatSelect,
        NgForOf,
        JsonPipe,
    ],
    providers: [
        provideNgxMask(maskConfig)
    ],
    templateUrl: './form-solicitudes.component.html',
    styleUrl: './form-solicitudes.component.scss'
})
export class FormSolicitudesComponent implements OnInit{
    private fb = inject(FormBuilder);
    public form: FormGroup;
    public dialogRef = inject(MatDialogRef<FormSolicitudesComponent>);
    public fuseService = inject(FuseConfirmationService);
    public estadosDatosService = inject(EstadosDatosService);
    public toasService = inject(ToastAlertsService);
    private empleadoService = inject(EmpleadosService);
    public _matData = inject(MAT_DIALOG_DATA);
    public subcripstion$: Subscription;
    aceptoTerminos = false;
    matDisabled = false;
    private swalService = inject(SwalService);
    private tipoSolicitudService = inject(TipoSolicitudesService)


    initialInfoForm!: FormGroup;
    firstFormGroup!: FormGroup;
    secondFormGroup!: FormGroup;

    private solicitudService: SolicitudesService = inject(SolicitudesService)
    empleado$ = this.empleadoService.getValidaInfo()
    tipoSolicitud$: Observable<any> = new Observable();


    ngOnInit(): void {
        this.createForm();

        this.empleado$.subscribe((response) => {
            if (response) {
                const data = response.data;

                this.firstFormGroup.patchValue({
                    nombreCompleto: data.primerNombre +' '+ ' ' + data.segundoNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido,
                    numDoc: data.numDoc,
                    direccion: data.direccion,
                    correo: data.correo,
                    idMunicipio: data.nombreMunicipio,
                    numCuentaBancaria: data.numCuentaBancaria + ' - ' +  data.nombreTipoCuenta + ' - ' + data.nombreBanco,
                    creditoActivo: data.credito
                });
                this.getCargueSolicitudes(data.credito)
            }
        })

    }

    getCargueSolicitudes(vieneCredito) {
        this.tipoSolicitud$ = this.tipoSolicitudService.getTipos().pipe(
            map((response) => {
                response.data = response.data.filter((res) => res.nombre !== 'Desembolsos');
                return response;
            }),
            tap((opciones) => {
                let valorDefecto;
                if (vieneCredito) {
                    valorDefecto = opciones.data[0];
                    this.secondFormGroup.get('idTipoSolicitud').setValue(valorDefecto.id)
                    this.secondFormGroup.get('solicitud').setValue(valorDefecto.nombre)
                }else {
                    valorDefecto = opciones.data[1];
                    this.secondFormGroup.get('idTipoSolicitud').setValue(valorDefecto.id)
                    this.secondFormGroup.get('solicitud').setValue(valorDefecto.nombre)
                }

            })
        )

        this.tipoSolicitud$.subscribe();
    }

    onAceptarTerminos(aceptado: boolean) {
        this.aceptoTerminos = aceptado;
        if (aceptado) {
            this.initialInfoForm.patchValue({check: true})
        }else {
            this.initialInfoForm.patchValue({check: ''})
        }
    }

    onSave() {
        if (this.secondFormGroup.valid) {
            if (!this._matData.edit) {
                const data = this.secondFormGroup.getRawValue();
                const {cupo, ...form} = data;
                const createData = {
                    cupo: Number(cupo),
                    ...form
                }
                const dialog = this.fuseService.open({
                    ...confirmarGuardado
                });

                dialog.afterClosed().subscribe((response) => {

                    if (response === 'confirmed') {
                        this.solicitudService.postSolicitudes(createData).subscribe((res) => {
                            console.log(res)
                            console.log('Edicion')
                            this.estadosDatosService.stateGrid.next(true);
                            this.swalService.ToastAler({
                                icon: 'success',
                                title: 'Registro creado con exito!',
                                timer: 4000,
                            })
                            this.closeDialog();
                        }, error => {
                            this.swalService.ToastAler({
                                icon: 'info',
                                title: error.error.errorMenssages[0],
                                timer: 6000,
                            })
                            this.closeDialog();
                        })
                    }else {
                        this.closeDialog();
                    }
                });
            }
        }
    }

    private createForm() {
        this.initialInfoForm = this.fb.group({
            check: ['', Validators.required]
        });

        this.firstFormGroup = this.fb.group({
            nombreCompleto: ['', [Validators.required]],
            numDoc: ['', [Validators.required]],
            direccion: ['', [Validators.required]],
            idMunicipio: ['', [Validators.required]],
            correo: ['', [Validators.required]],
            numCuentaBancaria: ['', [Validators.required]],
            creditoActivo: [''],
        });

        this.secondFormGroup = this.fb.group({
            cupo: ['', [Validators.required]],
            observacion: [''],
            idTipoSolicitud: [''],
            solicitud: [''],
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

}
