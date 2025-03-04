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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
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
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    deferredPrompt: any; // Para guardar el evento `beforeinstallprompt`
    showInstallButton: boolean = false; // Control para mostrar el botón

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
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
        this.signInForm = this._formBuilder.group({
            correo: [
                '',
                [Validators.required, Validators.email],
            ],
            contrasena: ['', Validators.required],
        });

        window.addEventListener('beforeinstallprompt', (event: any) => {
            console.log(event)
            event.preventDefault(); // Previene que el navegador muestre el mensaje automáticamente
            this.deferredPrompt = event; // Guarda el evento para usarlo más tarde
            this.showInstallButton = true; // Muestra el botón de instalación
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        const form = this.signInForm.getRawValue();

        const data = {
            ...form,
            idTipoUsuario: 'e626ea69-e995-4462-be9a-905326714781'
        }

        // Sign in
        this._authService.signIn(data).subscribe(
            () => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();


                // Set the alert
                this.alert = {
                    type: 'error',
                    message: '¡Error de Usuario o Contraseña!',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }

    installApp(): void {
        console.log('Clickic')
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt(); // Muestra el mensaje de instalación
            this.deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA instalada');
                } else {
                    console.log('Instalación rechazada');
                }
                this.deferredPrompt = null; // Resetea el prompt
            });
        }
    }
}
