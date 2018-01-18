import { Component } from '@angular/core';
import { PicrossComponent } from './picross/picross.component';
import { TableService } from './js/table.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import * as swal from 'sweetalert2';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { TimerComponent } from './timer/timer.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    rows: number;
    cols: number;

    public static DEFAULT_ROWS = 5;
    public static DEFAULT_COLS = 5;

    @ViewChild(PicrossComponent)
    private picross: PicrossComponent;
    @ViewChild(TimerComponent)
    private timer: TimerComponent;

    constructor(private router: Router, private tableService: TableService) { }

    ngOnInit(): void {
        this.rows = AppComponent.DEFAULT_ROWS;
        this.cols = AppComponent.DEFAULT_COLS;
    }

    generateSchema() {
        this.picross.start(this.rows, this.cols);
        this.timer.start();

        this.tableService.isCompleted
            .filter(v => v)
            .subscribe(v => this.timer.stop());
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

}