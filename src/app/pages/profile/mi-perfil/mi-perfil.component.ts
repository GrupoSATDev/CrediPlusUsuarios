import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../core/services/empleados.service';
import { SwalService } from '../../../core/services/swal.service';
import { Subscription } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
    imports: [
        MatButton,
        MatDialogClose,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatIcon,
        NgIf,
    ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent implements OnInit{

    private fb = inject(FormBuilder);
    public form: FormGroup;
    private empledosService = inject(EmpleadosService);
    public dialogRef = inject(MatDialogRef<MiPerfilComponent>);
    private swalService = inject(SwalService);
    public subcription$: Subscription;
    public image: any;


    getPerfil() {
        this.subcription$ = this.empledosService.getPerfil().subscribe((response) => {
            const empleado = response.data;
            this.form.patchValue(empleado);
        })
    }

    ngOnInit(): void {
        this.createForm();
        this.getPerfil();
    }

    private createForm() {
        this.form = this.fb.group({
            id: [null],
            primerNombre: [''],
            segundoNombre: [''],
            primerApellido: [''],
            segundoApellido: [''],
            idTipoDoc: [''],
            numDoc: [''],
            idDepartamento: [''],
            idMunicipio: [''],
            telefono: [''],
            telefono2: [''],
            direccion: [''],
            idGenero: [''],
            correo: [''],
            cargo: [''],
            fechaNacimiento: [''],
            fechaInicioContrato: [''],
            fechaFinContrato: ['null'],
            numCuentaBancaria: [''],
            salarioDevengado: [''],
            capacidadEndeudamiento: [''],
            idNivelRiesgo: [''],
            idBanco: [''],
            idTipoCuenta: [''],
            foto: [''],
            firma: [''],
            idSubEmpresa: [''],
            idTipoContrato: [''],
            nombreTipoDocumento: [''],
            estado: ['true']
        })


    }
}
