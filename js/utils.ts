"use strict";

module Utils
{
    export enum CellStatus
    {
        OPEN,
        CLOSED,
        CROSSED
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

        cycleCell(i : number, j : number)
        {
            var status : CellStatus = this.getCellStatus(i, j);
            if (status == CellStatus.OPEN)
                this.table[i][j] = CellStatus.CLOSED;
            else if (status == CellStatus.CLOSED)
                this.table[i][j] = CellStatus.CROSSED;
            else
                this.table[i][j] = CellStatus.OPEN;
        }

        checkRowStatus(r : number) : number[]
        {
            var row : number[] = [];
            var incr : boolean = false;
            for (var j = 0; j < this.c; j++)
            {
                if (this.getCellStatus(r, j) == CellStatus.CLOSED)
                {
                    if (!incr)
                    {
                        row.push(1);
                        incr = true;
                    }
                    else
                        row[row.length - 1]++;
                }
                else
                    incr = false;
            }
            return row;
        }

        checkColStatus(c : number) : number[]
        {
            var col : number[] = [];
            var incr : boolean = false;
            for (var i = 0; i < this.r; i++)
            {
                if (this.getCellStatus(i, c) == CellStatus.CLOSED)
                {
                    if (!incr)
                    {
                        col.push(1);
                        incr = true;
                    }
                    else
                        col[col.length - 1]++;
                }
                else
                    incr = false;
            }
            return col;
        }

        private createEmptyTable(disabled_rows : number[], disabled_cols : number[])
        {
            for (var i = 0; i < this.r; i++)
            {
                var row : CellStatus[] = new Array(this.c);
                var row_disabled : boolean = disabled_rows.indexOf(i) >= 0;

                for (var j = 0; j < this.c; j++)
                {
                    var col_disabled = disabled_cols.indexOf(j) >= 0;
                    row[j] = (row_disabled || col_disabled) ? CellStatus.CROSSED : CellStatus.OPEN;
                }
                this.table[i] = row;
            }
        }
    }


    export function init_val_array(labels : number[][]) : RowStatus[]
    {
        var ar : RowStatus[] = [];
        for (var i = 0; i < labels.length; i++)
        {
            if (labels[i].length == 1 && labels[i][0] === 0)
                ar.push(RowStatus.EQUAL);
            else
                ar.push(RowStatus.NOT_EQUAL);
        }
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
        for (var i = 0; i < array.length; i++)
            if (array[i] !== search_val)
                return false;
        return true;
    }
}