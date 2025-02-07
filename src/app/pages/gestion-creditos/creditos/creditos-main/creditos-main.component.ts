import { Component, inject, OnInit } from '@angular/core';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Router, RouterLink } from '@angular/router';
import { CreditosService } from '../../../../core/services/creditos.service';
import { FuseConfirmationService } from '../../../../../@fuse/services/confirmation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creditos-main',
  standalone: true,
    imports: [
        FuseCardComponent,
        RouterLink,
    ],
  templateUrl: './creditos-main.component.html',
  styleUrl: './creditos-main.component.scss'
})
export class CreditosMainComponent{

}
