import {Component, Input} from '@angular/core';
import { RowStatus } from '../../common/utils';

@Component({
    selector: 'picross-label',
    templateUrl: './picross-label.component.html',
    styleUrls: ['./picross-label.component.scss']
})
export class PicrossLabelComponent {
    @Input()
    status: RowStatus;

    @Input()
    labelClass: string;

    @Input()
    text: string;

    constructor() {
    }

    get isEqual(): boolean {
        return this.status === RowStatus.EQUAL;
    }

    get isWrong(): boolean {
        return this.status === RowStatus.WRONG;
    }
}
