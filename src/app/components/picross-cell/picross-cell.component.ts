import {Component, Input} from '@angular/core';
import {CellStatus} from 'app/common/utils';

@Component({
    selector: 'picross-cell',
    templateUrl: './picross-cell.component.html',
    styleUrls: ['./picross-cell.component.scss'],
})
export class PicrossCellComponent
{
    @Input() status: CellStatus;
    @Input() end: boolean;

    get isClosed(): boolean
    {
        return this.status === CellStatus.CLOSED;
    }

    get isGrayed(): boolean
    {
        return this.status === CellStatus.GRAYED;
    }

    get isCompleted(): boolean
    {
        return this.end;
    }
}
