///<reference path="interfaces.ts"/>

"use strict";

module Utils
{
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

        constructor(data : Interfaces.JSONSchemeData)
        {
            this.r = data.rows;
            this.c = data.cols;

            this.rows = data.rowLabels.map((label : number[])=>
            {
                var disabled : boolean = PicrossTable._isLabelDisabled(label);

                return <RowData> {
                    label: label,
                    disabled: disabled,
                    status: disabled ? RowStatus.EQUAL : RowStatus.NOT_EQUAL
                };
            });
            this.cols = data.colLabels.map((label : number[])=>
            {
                var disabled : boolean = PicrossTable._isLabelDisabled(label);

                return <RowData> {
                    label: label,
                    disabled: disabled,
                    status: disabled ? RowStatus.EQUAL : RowStatus.NOT_EQUAL
                };
            });

            this.table = new Array(this.r);
            this.createEmptyTable();
        }

        getCellStatus(i : number, j : number) : CellStatus
        {
            return this.table[i][j];
        }

        closeCell(i : number, j : number) : void
        {
            var status : CellStatus = this.getCellStatus(i, j);
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
            var status : CellStatus = this.getCellStatus(i, j);
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

        private _checkRowStatus(r : number) : number[]
        {
            var row : number[] = [];
            var incrementer : CheckFunc = this.IncrementerFactory(row);

            for (var j = 0; j < this.c; j++)
                incrementer(this.getCellStatus(r, j));

            return row;
        }

        private _checkColStatus(c : number) : number[]
        {
            var col : number[] = [];
            var incrementer : CheckFunc = this.IncrementerFactory(col);

            for (var i = 0; i < this.r; i++)
                incrementer(this.getCellStatus(i, c));

            return col;
        }

        private IncrementerFactory(res : number[]) : CheckFunc
        {
            var currentBlock : boolean = false;

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

        private createEmptyTable()
        {
            for (var i = 0; i < this.r; i++)
            {
                var row : CellStatus[] = new Array(this.c);
                var row_disabled : boolean = this.getRowData(i).disabled;

                for (var j = 0; j < this.c; j++)
                {
                    if (row_disabled)
                        row[j] = CellStatus.GRAYED;
                    else
                        row[j] = this.getColData(j).disabled ? CellStatus.GRAYED : CellStatus.OPEN;
                }
                this.table[i] = row;
            }
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
            return (this.rows.every((data : RowData) => data.status == RowStatus.EQUAL) && this.cols.every((data : RowData) => data.status == RowStatus.EQUAL));
        }

        private static _isLabelDisabled(label : number[]) : boolean
        {
            return label.length == 1 && label[0] === 0;
        }

        updateRowStatus(r : number) : void
        {
            this.rows[r].status = Utils.PicrossTable._checkRow(this.rows[r].label, this._checkRowStatus(r));
        }

        updateColStatus(c : number) : void
        {
            this.cols[c].status = Utils.PicrossTable._checkRow(this.cols[c].label, this._checkColStatus(c));
        }

        private static _checkRow(labels : number[], row : number[]) : RowStatus
        {
            if (labels.length < row.length)
                return RowStatus.WRONG;
            else if (labels.length > row.length)
                return RowStatus.NOT_EQUAL;

            for (var i = 0; i < labels.length; i++)
                if (labels[i] < row[i])
                    return RowStatus.WRONG;
                else if (labels[i] > row[i])
                    return RowStatus.NOT_EQUAL;
            return RowStatus.EQUAL;
        }
    }
}