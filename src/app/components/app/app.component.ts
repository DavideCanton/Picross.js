import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import * as swal from 'sweetalert2';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { PicrossComponent } from '../picross/picross.component';
import { TimerComponent } from '../timer/timer.component';
import { TableService } from '../../services/table/table.service';
import { EnvironmentService } from '../../services/environment/environment.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    rows: number;
    cols: number;

    public choices: number[] = [5, 8, 10, 15];

    @ViewChild(PicrossComponent)
    private picross: PicrossComponent;
    @ViewChild(TimerComponent)
    private timer: TimerComponent;

    constructor(private router: Router, private tableService: TableService, private envService: EnvironmentService) { }

    ngOnInit(): void {
        this.rows = this.choices[0];
        this.cols = this.choices[0];
    }

    generateSchema() {
        this.picross.start(this.rows, this.cols);
        this.timer.start();
    }

    endTable() {
        this.timer.stop();
    }

    clearTable() {
        swal.default({
            title: 'Attenzione!',
            text: 'Perderai i tuoi progressi! Sei sicuro?',
            type: 'warning',
            showCancelButton: true
        }).then(result => {
            if (result.value)
                this.tableService.clearTable();
        });
    }

    get env_description(): string {
        return this.envService.description;
    }
}
