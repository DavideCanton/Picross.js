import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TableService } from '../js/table.service';
import { CellStatus } from '../js/utils';
import { HostListener } from '@angular/core';

@Component({
    selector: 'picross-cell',
    templateUrl: './picross-cell.component.html',
    styleUrls: ['./picross-cell.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PicrossCellComponent {
    @Input()
    row: number;

    @Input()
    col: number;

    constructor(private tableService: TableService) {
    }

    get status(): CellStatus {
        return this.tableService.getCellStatus(this.row, this.col);
    }

    get isClosed(): boolean {
        return this.status === CellStatus.CLOSED;
    }

    get isGrayed(): boolean {
        return this.status === CellStatus.GRAYED;
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        const pressing = this.tableService.getPressing();
        if (pressing !== null) {
            this.tableService.setCellStatus(this.row, this.col, pressing);
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            this.tableService.pressedCell(this.row, this.col);
            this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
        } else if (event.button === 2) {
            event.preventDefault();
            event.stopPropagation();
            this.tableService.pressedRightCell(this.row, this.col);
            this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
        }
    }

    @HostListener('mouseup')
    onMouseUp() {
        this.tableService.setPressing(null);
    }

    @HostListener('contextmenu')
    onContextMenu(): boolean {
        return false;
    }
}