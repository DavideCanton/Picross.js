import {Component, Input} from '@angular/core';
import { SeqStatus } from '../../common/utils';

@Component({
    selector: 'picross-label',
    templateUrl: './picross-label.component.html',
    styleUrls: ['./picross-label.component.scss']
})
export class PicrossLabelComponent {
    @Input()
    status: SeqStatus;

    @Input()
    labelClass: string;

    @Input()
    text: string;

    constructor() {
    }

    get isEqual(): boolean {
        return this.status === SeqStatus.EQUAL;
    }

    get isWrong(): boolean {
        return this.status === SeqStatus.WRONG;
    }
}
