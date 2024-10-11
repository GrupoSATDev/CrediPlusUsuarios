import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { TiposDocumentosService } from '../../../core/services/tipos-documentos.service';
import { tap } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SwalService } from '../../../core/services/swal.service';
import { FuseConfirmationService } from '../../../../@fuse/services/confirmation';
import { guardar } from '../../../core/constant/dialogs';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSelect,
        MatOption,
        AsyncPipe,
        NgForOf,
        NgIf,
    ],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    private tiposDocumentosService = inject(TiposDocumentosService);
    private swalService = inject(SwalService);
    public fuseService = inject(FuseConfirmationService);


    public tiposDocumentos$ = this.tiposDocumentosService.getTiposDocumentos().pipe(
        tap((response) => {
            const valorSelected = response.data;
            if (valorSelected) {
                this.signUpForm.get('idTipoDoc').setValue(valorSelected[3].id)
            }
        })
    )

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            idTipoDoc: [''],
            numDoc: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            contrasena: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        const dialog = this.fuseService.open({
            ...guardar
        });

        dialog.afterClosed().subscribe((response) => {

            if (response === 'confirmed') {
                this._authService.signUp(this.signUpForm.value).subscribe(
                    (response) => {
                        // Navigate to the confirmation required page
                        this.swalService.ToastAler({
                            icon: 'success',
                            title: 'Registro creado con exito!',
                            timer: 4000,
                        })
                        setTimeout(() => {
                            this._router.navigateByUrl('/sign-in');
                        }, 2000)

                    },
                    (response) => {
                        // Re-enable the form
                        this.signUpForm.enable();

                        // Reset the form
                        this.signUpNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: '¡Error al registrar!.',
                        };

                        // Show the alert
                        this.showAlert = true;
                    }
                );

            }
        })
        // Sign up

    }


}
