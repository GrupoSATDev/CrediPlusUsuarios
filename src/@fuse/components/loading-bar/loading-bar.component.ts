import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    Component,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseLoadingService } from '@fuse/services/loading';
import { delay, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'fuse-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'fuseLoadingBar',
    standalone: true,
    imports: [MatProgressBarModule],
})
export class FuseLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
    private _fuseLoadingService = inject(FuseLoadingService);

    @Input() autoMode: boolean = true;
    mode: 'determinate' | 'indeterminate';
    progress: number = 0;
    show: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Auto mode
        if ('autoMode' in changes) {
            // Set the auto mode in the service
            this._fuseLoadingService.setAutoMode(
                coerceBooleanProperty(changes.autoMode.currentValue)
            );
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the service
        this._fuseLoadingService.mode$
            .pipe(
                delay(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                setTimeout(() => {
                    this.mode = value;
                }, )
            });

        this._fuseLoadingService.progress$
            .pipe(
                delay(300),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
                setTimeout(() => {
                    this.progress = value;
                }, )
            });

        this._fuseLoadingService.show$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                setTimeout(() => {
                    this.show = value;
                }, )
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}