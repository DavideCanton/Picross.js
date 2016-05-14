import {Component, Input, ViewEncapsulation} from "angular2/core";
import {RowStatus} from "../js/utils";

@Component({
    selector: '[picross-label]',
    templateUrl: 'app/picross-label/picross-label.component.html',
    styleUrls: ['app/picross-label/picross-label.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PicrossLabelComponent
{
    @Input()
    status : RowStatus;

    @Input()
    labelClass: string;

    @Input()
    text: string;

    constructor()
    {
    }

    get isEqual() : boolean
    {
        return this.status === RowStatus.EQUAL;
    }

    get isWrong() : boolean
    {
        return this.status === RowStatus.WRONG;
    }
}