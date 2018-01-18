import {Injectable} from '@angular/core';
import {PicrossTable, CellStatus, RowData} from '../js/utils';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


export interface JSONSchemeData {
    rowLabels: number[][];
    colLabels: number[][];
    rows: number;
    cols: number;
}

@Injectable()
export class TableService {
    private table: PicrossTable;
    private _end: Subject<boolean>;
    private end: boolean;
    private pressing: CellStatus;

    constructor() {
        this.table = null;
        this.pressing = null;
        this._end = new Subject();
        this._end.subscribe(v => this.end = v);
    }

    setPressing(pressing: CellStatus) {
        this.pressing = pressing;
    }

    getPressing(): CellStatus {
        return this.pressing;
    }

    initTable(row: number, col: number) {
        this.table = PicrossTable.randomTable(row, col, 0.8);
        this._end.next(false);
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
            this._end.next(true);
        }
    }

    get isCompleted(): Observable<boolean> {
        return this._end.asObservable();
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
            this._end.next(true);
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
