"use strict";

import {JSONSchemeData} from "./interfaces";

interface CheckFunc
{
    (CellStatus) : void;
}

export enum CellStatus
{
    OPEN,
    CLOSED,
    GRAYED
}

export enum RowStatus
{
    EQUAL,
    WRONG,
    NOT_EQUAL
}

export interface RowData
{
    label : number[];
    disabled : boolean;
    status : RowStatus;
}

export class PicrossTable
{
    r : number;
    c : number;
    table : CellStatus[][];
    rows : RowData[];
    cols : RowData[];

    static randomTable(r : number, c : number, percentage : number) : PicrossTable
    {
        var table = new PicrossTable(null);
        table.r = r;
        table.c = c;

        table.createRandomTable(percentage);
        table.setupData();
        table.createEmptyTable();

        return table;
    }

    constructor(data : JSONSchemeData)
    {
        if (data)
        {
            this.r = data.rows;
            this.c = data.cols;

            this.rows = data.rowLabels.map((label : number[])=>
            {
                let disabled = PicrossTable._isLabelDisabled(label);

                return <RowData> {
                    label: label,
                    disabled: disabled,
                    status: disabled ? RowStatus.EQUAL : RowStatus.NOT_EQUAL
                };
            });
            this.cols = data.colLabels.map((label : number[])=>
            {
                let disabled = PicrossTable._isLabelDisabled(label);

                return <RowData> {
                    label: label,
                    disabled: disabled,
                    status: disabled ? RowStatus.EQUAL : RowStatus.NOT_EQUAL
                };
            });

            this.table = new Array(this.r);
            this.createEmptyTable();
        }
    }

    getCellStatus(i : number, j : number) : CellStatus
    {
        return this.table[i][j];
    }

    setCellStatus(i : number, j : number, status : CellStatus) : void
    {
        this.table[i][j] = status;
    }

    closeCell(i : number, j : number) : void
    {
        let status = this.getCellStatus(i, j);
        switch (status)
        {
            case CellStatus.CLOSED:
                this.table[i][j] = CellStatus.OPEN;
                break;
            case CellStatus.OPEN:
                this.table[i][j] = CellStatus.CLOSED;
                break;
            case CellStatus.GRAYED:
                this.table[i][j] = CellStatus.OPEN;
                break;
        }
    }

    grayCell(i : number, j : number) : void
    {
        let status = this.getCellStatus(i, j);
        switch (status)
        {
            case CellStatus.CLOSED:
                this.table[i][j] = CellStatus.GRAYED;
                break;
            case CellStatus.OPEN:
                this.table[i][j] = CellStatus.GRAYED;
                break;
            case CellStatus.GRAYED:
                this.table[i][j] = CellStatus.OPEN;
                break;
        }
    }

    private _computeActualRowLabels(r : number) : number[]
    {
        let row = [];
        let incrementer = this.IncrementerFactory(row);

        for (let j = 0; j < this.c; j++)
            incrementer(this.getCellStatus(r, j));

        if (row.length == 0)
            row = [0];

        return row;
    }

    private _computeActualColLabels(c : number) : number[]
    {
        let col = [];
        let incrementer = this.IncrementerFactory(col);

        for (let i = 0; i < this.r; i++)
            incrementer(this.getCellStatus(i, c));

        if (col.length == 0)
            col = [0];

        return col;
    }

    private IncrementerFactory(res : number[]) : CheckFunc
    {
        let currentBlock = false;

        return (status : CellStatus) =>
        {
            if (status === CellStatus.CLOSED)
            {
                if (!currentBlock)
                {
                    res.push(1);
                    currentBlock = true;
                }
                else
                    res[res.length - 1]++;
            }
            else
                currentBlock = false;
        };
    }

    private createRandomTable(percentage : number) : void
    {
        this.table = [];
        for (let i = 0; i < this.r; i++)
        {
            let row = new Array<CellStatus>(this.c);

            for (let j = 0; j < this.c; j++)
                row[j] = Math.random() <= percentage ? CellStatus.CLOSED : CellStatus.OPEN;
            this.table[i] = row;
        }
    }

    private createEmptyTable()
    {
        for (let i = 0; i < this.r; i++)
        {
            let row = new Array<CellStatus>(this.c);
            let row_disabled = this.getRowData(i).disabled;

            for (let j = 0; j < this.c; j++)
            {
                if (row_disabled)
                    row[j] = CellStatus.GRAYED;
                else
                    row[j] = this.getColData(j).disabled ? CellStatus.GRAYED : CellStatus.OPEN;
            }
            this.table[i] = row;
        }
    }

    getRowsData() : RowData[]
    {
        return this.rows;
    }

    getColsData() : RowData[]
    {
        return this.cols;
    }

    getRowData(index : number) : RowData
    {
        return this.rows[index];
    }

    getColData(index : number) : RowData
    {
        return this.cols[index];
    }

    isCompleted() : boolean
    {
        return (this.rows.every((data : RowData) => data.status == RowStatus.EQUAL) &&
                this.cols.every((data : RowData) => data.status == RowStatus.EQUAL));
    }

    private static _isLabelDisabled(label : number[]) : boolean
    {
        return label.length == 1 && label[0] === 0;
    }

    updateRowStatus(r : number) : void
    {
        this.rows[r].status = PicrossTable._checkRow(this.rows[r].label, this._computeActualRowLabels(r));
    }

    updateColStatus(c : number) : void
    {
        this.cols[c].status = PicrossTable._checkRow(this.cols[c].label, this._computeActualColLabels(c));
    }

    private static _checkRow(labels : number[], row : number[]) : RowStatus
    {
        if (labels.length < row.length)
            return RowStatus.WRONG;
        else if (labels.length > row.length)
            return RowStatus.NOT_EQUAL;

        for (let i = 0; i < labels.length; i++)
            if (labels[i] < row[i])
                return RowStatus.WRONG;
            else if (labels[i] > row[i])
                return RowStatus.NOT_EQUAL;
        return RowStatus.EQUAL;
    }

    private setupData() : void
    {
        this.rows = [];
        this.cols = [];

        let params = [
            [this.rows, this.r, this._computeActualRowLabels.bind(this)],
            [this.cols, this.c, this._computeActualColLabels.bind(this)]
        ];

        params.forEach(val =>
            ((array : RowData[], len : number, fun : (number) => number[]) =>
            {
                for (let i = 0; i < len; i++)
                {
                    let label : number[] = fun(i);
                    let disabled : boolean = PicrossTable._isLabelDisabled(label);

                    array.push(<RowData>{
                        label: label,
                        disabled: disabled,
                        status: disabled ? RowStatus.EQUAL : RowStatus.NOT_EQUAL
                    });
                }
            }).apply(this, val));
    }

    clear()
    {
        _.each(this.table, (row, i) =>
        {
            if (this.rows[i].disabled)
                return;

            _.each(row, (_, j) =>
            {
                if (this.cols[j].disabled)
                    return;
                row[j] = CellStatus.OPEN;

                this.cols[j].status = RowStatus.NOT_EQUAL;
            });

            this.rows[i].status = RowStatus.NOT_EQUAL;
        });
    }
}