import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit
{
    time: number;
    timer: Observable<number>;
    _isRunning: boolean;

    constructor() { }

    ngOnInit(): void
    {
        this.timer = interval(1000);

        this.timer.subscribe(_ =>
        {
            if(this._isRunning)
            {
                ++this.time;
            }
        });

        this.time = 0;
    }

    start()
    {
        this.time = 0;
        this._isRunning = true;
    }

    stop()
    {
        this._isRunning = false;
    }

    get minutes(): string
    {
        const val = Math.floor(this.time / 60);
        return TimerComponent.pad(val, 2);
    }

    get seconds(): string
    {
        const val = Math.floor(this.time % 60);
        return TimerComponent.pad(val, 2);
    }

    get minute1(): string { return this.minutes[0]; }
    get minute2(): string { return this.minutes[1]; }
    get second1(): string { return this.seconds[0]; }
    get second2(): string { return this.seconds[1]; }

    get isRunning(): boolean
    {
        return this._isRunning;
    }

    // tslint:disable-next-line:member-ordering
    static pad(v: number, size: number): string
    {
        let s = String(v);
        while(s.length < (size || 2))
        {
            s = '0' + s;
        }
        return s;
    }

}
