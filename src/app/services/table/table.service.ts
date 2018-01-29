import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PicrossTable, CellStatus, RowData } from '../../js/utils';


export interface JSONSchemeData {
    rowLabels: number[][];
    colLabels: number[][];
    rows: number;
    cols: number;
}

@Injectable()
export class TableService {
    private table: PicrossTable;
    private end: boolean;
    private pressing: CellStatus;

    constructor() {
        this.table = null;
        this.pressing = null;
    }

    setPressing(pressing: CellStatus) {
        this.pressing = pressing;
    }

    getPressing(): CellStatus {
        return this.pressing;
    }

    initTable(row: number, col: number) {
        this.table = PicrossTable.randomTable(row, col, 0.8);
        this.end = false;
    }

    private updateEnabled(r: number, c: number) {
        this.table.updateRowStatus(r);
        this.table.updateColStatus(c);
    }

    getCellStatus(i: number, j: number): CellStatus {
        return this.table.getCellStatus(i, j);
    }

    setCellStatus(i: number, j: number, status: CellStatus) {
        if (this.end) {
            return;
        }

        if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled) {
            return;
        }

        this.table.setCellStatus(i, j, status);
        this.updateEnabled(i, j);

        if (this.table.isCompleted()) {
            this.end = true;
        }
    }

    get isCompleted(): boolean {
        return this.end;
    }

    pressedCell(i: number, j: number) {
        if (this.end) {
            return;
        }
        if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled) {
            return;
        }

        this.table.closeCell(i, j);
        this.updateEnabled(i, j);

        if (this.table.isCompleted()) {
            this.end = true;
        }
    }

    pressedRightCell(i: number, j: number) {
        if (this.end) {
            return;
        }
        if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled) {
            return;
        }
        this.table.grayCell(i, j);
        this.updateEnabled(i, j);
    }

    clearTable() {
        this.table.clear();
    }

    getRowsData(): RowData[] {
        return this.table.getRowsData();
    }

    getColsData(): RowData[] {
        return this.table.getColsData();
    }

    get rows(): number {
        return this.table.r;
    }

    get cols(): number {
        return this.table.c;
    }
}
