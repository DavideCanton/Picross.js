import { Component } from "@angular/core";
import { PicrossComponent } from "./picross/picross.component";
import { TableService } from "./js/table.service";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import * as swal from "sweetalert2";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    waiting: boolean;
    errorMsg: string;
    error: boolean;
    
    rows: number;
    cols: number;

    public static DEFAULT_ROWS = 5;
    public static DEFAULT_COLS = 5;

    @ViewChild(PicrossComponent) 
    private _child: PicrossComponent;

    constructor(private router: Router, private tableService: TableService) {
        this.waiting = false;
        this.reset();
        this.rows = AppComponent.DEFAULT_ROWS;
        this.cols = AppComponent.DEFAULT_COLS;
    }

    reset() {
        this.errorMsg = "";
        this.error = false;
    }

    generateSchema() {
        this._child.start(this.rows, this.cols);
    }

    clearTable() {
        swal.default({
            title: "Attenzione!",
            text: "Perderai i tuoi progressi! Sei sicuro?",
            type: "warning",
            showCancelButton: true
        }).then(result =>
        {
            if (result.value)
                this.tableService.clearTable();
        });
    }
}