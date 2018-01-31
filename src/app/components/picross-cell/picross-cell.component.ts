import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { CellStatus } from '../../common/utils';
import { TableService } from '../../services/table/table.service';

@Component({
    selector: 'picross-cell',
    templateUrl: './picross-cell.component.html',
    styleUrls: ['./picross-cell.component.scss'],
})
export class PicrossCellComponent {
    @Input()
    row: number;

    @Input()
    col: number;

    @Output()
    changeEvent = new EventEmitter<any>();

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

    get end(): boolean {
        return this.tableService.isCompleted;
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        const pressing = this.tableService.getPressing();
        if (pressing !== null) {
            this.tableService.setCellStatus(this.row, this.col, pressing);
            this.changeEvent.next();
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            this.tableService.pressedCell(this.row, this.col);
            this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
            this.changeEvent.next();
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
