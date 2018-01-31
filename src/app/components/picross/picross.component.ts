import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../../services/table/table.service';
import { CellStatus, RowData } from '../../common/utils';

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

    @Output()
    endTable = new EventEmitter<any>();

    constructor(private tableService: TableService) {
    }

    ngOnInit(): void {
        this.initialized = false;
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

    @HostListener('mouseup')
    onMouseUp() {
        this.disablePressing();
    }

    change() {
        if (this.tableService.isCompleted)
            this.endTable.emit();
    }

    @HostListener('contextmenu')
    onContextMenu(): boolean {
        return false;
    }
}

