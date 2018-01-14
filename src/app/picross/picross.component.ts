import { Component, OnInit } from "@angular/core";
import { TableService } from "../js/table.service";
import { CellStatus, RowData } from "../js/utils";
import * as _ from 'lodash';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'picross-component',
    templateUrl: './picross.component.html',
    styleUrls: ['./picross.component.scss']
})
export class PicrossComponent implements OnInit {
    pressing: CellStatus;
    rows: number;
    cols: number;
    initialized: boolean;
    end: boolean;

    constructor(private tableService: TableService) {
    }

    ngOnInit(): void {
        this.initialized = false;

        this.tableService.isCompleted.subscribe(v => this.end = v);
    }

    start(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.initialized = true;

        this.tableService.initTable(this.rows, this.cols);
    }

    range(limit: number): number[] {
        return _.range(limit);
    }

    getRowsData(): RowData[] {
        return this.tableService.getRowsData();
    }

    getColsData(): RowData[] {
        return this.tableService.getColsData();
    }

    disablePressing() {
        this.tableService.setPressing(null);
    }
}

