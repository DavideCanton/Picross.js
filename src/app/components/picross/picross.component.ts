import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CellStatus, RowData} from 'app/common/utils';
import {TableService} from 'app/services/table/table.service';
import {range} from 'lodash';

@Component({
    selector: 'picross-component',
    templateUrl: './picross.component.html',
    styleUrls: ['./picross.component.scss']
})
export class PicrossComponent implements OnInit
{
    rows: number;
    cols: number;
    initialized: boolean;

    @Output() endTable = new EventEmitter<any>();

    constructor(private tableService: TableService)
    {
    }

    get isCompleted(): boolean
    {
        return this.tableService.isCompleted;
    }

    ngOnInit(): void
    {
        this.initialized = false;
    }

    start(rows: number, cols: number)
    {
        this.rows = rows;
        this.cols = cols;
        this.initialized = true;

        this.tableService.initTable(this.rows, this.cols);
    }

    range(limit: number): number[]
    {
        return range(limit);
    }

    getRowsData(): RowData[]
    {
        return this.tableService.getRowsData();
    }

    getColsData(): RowData[]
    {
        return this.tableService.getColsData();
    }

    getStatus(r: number, c: number): CellStatus
    {
        return this.tableService.getCellStatus(r, c);
    }

    disablePressing(): void
    {
        this.tableService.setPressing(null);
    }

    @HostListener('contextmenu')
    onContextMenu(): boolean
    {
        return false;
    }

    onMouseEnterCell(row: number, col: number)
    {
        if (this.isCompleted) return;

        const pressing = this.tableService.getPressing();
        if (pressing !== null)
            this.tableService.setCellStatus(row, col, pressing);

        this.checkCompleted();
    }

    onMouseDownCell(event: MouseEvent, row: number, col: number)
    {
        if (this.isCompleted) return;

        if (event.button === 0)
        {
            this.tableService.pressedCell(row, col);
            this.tableService.setPressing(this.tableService.getCellStatus(row, col));
        }
        else if (event.button === 2)
        {
            event.preventDefault();
            event.stopPropagation();
            this.tableService.pressedRightCell(row, col);
            this.tableService.setPressing(this.tableService.getCellStatus(row, col));
        }

        this.checkCompleted();
    }

    onMouseUpCell()
    {
        this.disablePressing();
    }

    private checkCompleted()
    {
        if (this.isCompleted)
        {
            this.endTable.emit();
            this.disablePressing();
        }
    }
}

