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

    export class PicrossTable
    {
        r : number;
        c : number;
        table : CellStatus[][];

        constructor(r : number, c : number, disabled_rows : number[], disabled_cols : number[])
        {
            this.r = r;
            this.c = c;
            this.table = new Array(r);
            this.createEmptyTable(disabled_rows, disabled_cols);
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

        checkRowStatus(r : number) : number[]
        {
            var row : number[] = [];
            var incrementer : CheckFunc = this.IncrementerFactory(row);

            for (var j = 0; j < this.c; j++)
                incrementer(this.getCellStatus(r, j));

            return row;
        }

        checkColStatus(c : number) : number[]
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

        private createEmptyTable(disabled_rows : number[], disabled_cols : number[])
        {
            for (var i = 0; i < this.r; i++)
            {
                var row : CellStatus[] = new Array(this.c);
                var row_disabled : boolean = disabled_rows.indexOf(i) >= 0;

                for (var j = 0; j < this.c; j++)
                {
                    if (row_disabled)
                        row[j] = CellStatus.GRAYED;
                    else
                    {
                        var col_disabled = disabled_cols.indexOf(j) >= 0;
                        row[j] = col_disabled ? CellStatus.GRAYED : CellStatus.OPEN;
                    }
                }
                this.table[i] = row;
            }
        }
    }


    export function init_val_array(labels : number[][]) : RowStatus[]
    {
        var ar : RowStatus[] = [];
        labels.forEach((label : number[]) =>
        {
            if (label.length == 1 && label[0] === 0)
                ar.push(RowStatus.EQUAL);
            else
                ar.push(RowStatus.NOT_EQUAL);
        });
        return ar;
    }


    export function checkRow(labels : number[], row : number[]) : RowStatus
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

    export function all_el<T>(array : T[], search_val : T) : boolean
    {
        return array.every((el) => el === search_val);
    }
}