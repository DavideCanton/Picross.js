import {Component, OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {TableService} from "../js/tableService";
import {CellStatus, RowData} from "../js/utils";
import {PicrossCellComponent} from "../picross-cell/picross-cell.component";
import {PicrossLabelComponent} from "../picross-label/picross-label.component";

@Component({
    selector: 'picross-component',
    templateUrl: 'app/picross/picross.component.html',
    styleUrls: ['app/picross/picross.component.css'],
    directives: [PicrossCellComponent, PicrossLabelComponent]
})
export class PicrossComponent implements OnInit
{
    loaded : boolean;
    pressing : CellStatus;
    rows : number;
    cols : number;

    constructor(params : RouteParams, private tableService : TableService)
    {
        this.rows = +params.get("w") || 5;
        this.cols = +params.get("h") || 5;
    }

    ngOnInit()
    {
        this.tableService.initTable(this.rows, this.cols);
        this.loaded = true;
    }
    
    get end() : boolean
    {
        return this.tableService.isCompleted;
    }

    range(limit : number) : number[]
    {
        return _.range(limit);
    }

    getRowsData() : RowData[]
    {
        return this.tableService.getRowsData();
    }

    getColsData() : RowData[]
    {
        return this.tableService.getColsData();
    }

    disablePressing()
    {
        this.tableService.setPressing(null);
    }
}

