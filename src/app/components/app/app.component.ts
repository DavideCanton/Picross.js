import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PicrossComponent} from 'app/components/picross/picross.component';
import {TimerComponent} from 'app/components/timer/timer.component';
import {EnvironmentService} from 'app/services/environment/environment.service';
import {TableService} from 'app/services/table/table.service';
import * as swal from 'sweetalert2';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    rows: number;
    cols: number;

    public choices: number[] = [5, 8, 10, 15];

    @ViewChild(PicrossComponent) private picross: PicrossComponent;
    @ViewChild(TimerComponent) private timer: TimerComponent;

    constructor(
        private router: Router,
        private tableService: TableService,
        private envService: EnvironmentService
    )
    {
    }

    ngOnInit(): void
    {
        this.rows = this.choices[0];
        this.cols = this.choices[0];
    }

    generateSchema()
    {
        this.picross.start(this.rows, this.cols);
        this.timer.reset();
        this.timer.start();
    }

    endTable()
    {
        this.timer.stop();
    }

    clearTable()
    {
        swal.default({
            title: 'Attenzione!',
            text: 'Perderai i tuoi progressi! Sei sicuro?',
            type: 'warning',
            showCancelButton: true
        }).then(result =>
        {
            if (result.value)
                this.tableService.clearTable();
        });
    }
}
