import {Component, Input, ViewEncapsulation} from "angular2/core";
import {TableService} from "../js/tableService";
import {CellStatus} from "../js/utils";

@Component({
    selector: '[picross-cell]',
    templateUrl: 'app/picross-cell/picross-cell.component.html',
    styleUrls: ['app/picross-cell/picross-cell.component.css'],
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mousedown)': 'onMouseDown($event)',
        '(mouseup)': 'onMouseUp()',
        '(contextmenu)': 'onContextMenu()'
    },
    encapsulation: ViewEncapsulation.None
})
export class PicrossCellComponent
{
    @Input()
    row : number;

    @Input()
    col : number;

    constructor(private tableService : TableService)
    {
    }

    get status() : CellStatus
    {
        return this.tableService.getCellStatus(this.row, this.col);
    }

    get isClosed() : boolean
    {
        return this.status === CellStatus.CLOSED;
    }

    get isGrayed() : boolean
    {
        return this.status === CellStatus.GRAYED;
    }

    onMouseEnter()
    {
        let pressing = this.tableService.getPressing();
        if (pressing !== null)
            this.tableService.setCellStatus(this.row, this.col, pressing);
    }

    onMouseDown(event : MouseEvent)
    {
        if (event.button === 0)
        {
            this.tableService.pressedCell(this.row, this.col);
            this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
        }
        else if (event.button === 2)
        {
            event.preventDefault();
            event.stopPropagation();
            this.tableService.pressedRightCell(this.row, this.col);
            this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
        }
    }

    onMouseUp()
    {
        this.tableService.setPressing(null);
    }

    onContextMenu() : boolean
    {
        return false;
    }
}