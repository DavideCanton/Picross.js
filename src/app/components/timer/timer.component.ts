import {Component, OnInit} from '@angular/core';
import {padStart} from 'lodash';
import {BehaviorSubject, combineLatest, Observable, Subject, timer} from 'rxjs';
import {filter, map, scan, switchAll} from 'rxjs/operators';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit
{
    timeString$: Observable<string>;

    private toggle$ = new BehaviorSubject<boolean>(false);
    private reset$ = new Subject<any>();

    ngOnInit()
    {
        this.initTimer();
    }

    start()
    {
        this.toggle$.next(true);
    }

    stop()
    {
        this.toggle$.next(false);
    }

    reset()
    {
        this.stop();
        this.reset$.next();
    }

    private initTimer()
    {
        this.timeString$ = this.reset$.pipe(
            map(() => combineLatest([
                timer(0, 1000),
                this.toggle$
            ]).pipe(
                filter(([, v]) => v),
                scan((acc,) => acc + 1, 0),
                map(ticks => TimerComponent.formatTime(ticks))
            )),
            switchAll()
        );
    }

    private static formatTime(ticks: number)
    {
        const minutes = Math.floor(ticks / 60).toString();
        const seconds = Math.floor(ticks % 60).toString();
        return `${padStart(minutes, 2, '0')}:${padStart(seconds, 2, '0')}`;
    }
}
