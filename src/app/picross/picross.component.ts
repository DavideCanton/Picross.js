import { Component } from "@angular/core";
import { TableService } from "../js/table.service";
import { CellStatus, RowData } from "../js/utils";
import * as _ from 'lodash';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'picross-component',
    templateUrl: './picross.component.html',
    styleUrls: ['./picross.component.scss']
})
export class PicrossComponent {
    pressing: CellStatus;
    rows: number;
    cols: number;
    initialized: boolean;

    constructor(private tableService: TableService) {
        this.initialized = false;
    }

    start(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.initialized = true;

        this.tableService.initTable(this.rows, this.cols);
    }

    get end(): boolean {
        return this.tableService.isCompleted;
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

