import { Component, inject, OnInit } from '@angular/core';
import { FuseAlertComponent } from '../../../../../@fuse/components/alert';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { CreditosService } from '../../../../core/services/creditos.service';
import { FuseConfirmationService } from '../../../../../@fuse/services/confirmation';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-creditos',
  standalone: true,
    imports: [
        FuseAlertComponent,
        FuseCardComponent,
        MatButton,
        MatIcon,
        NgForOf,
        NgIf,
    ],
  templateUrl: './mis-creditos.component.html',
  styleUrl: './mis-creditos.component.scss'
})
export class MisCreditosComponent implements OnInit{

    private creditoService: CreditosService = inject(CreditosService);
    public fuseService = inject(FuseConfirmationService);
    private router = inject(Router);
    public subcription$: Subscription;

    data = [];

    getCredito() {
        this.subcription$ = this.creditoService.getCreditosCard().subscribe((response) => {
            this.data = response.data;
        })
    }

    ngOnInit(): void {
        this.getCredito();
    }

    onSelect(id) {
        this.router.navigate(['/pages/gestion-creditos/creditos/view-detalle', id]);
    }

}
