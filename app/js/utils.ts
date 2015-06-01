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

    export class PicrossTable
    {
        r : number;
        c : number;
        table : CellStatus[][];
        rowLabels : number[][];
        colLabels : number[][];
        disabled_rows : number[];
        disabled_cols : number[];
        rowLabelStatus : RowStatus[];
        colLabelStatus : RowStatus[];

        constructor(data : Interfaces.JSONSchemeData)
        {
            this.r = data.rows;
            this.c = data.cols;
            this.rowLabels = data.rowLabels;
            this.colLabels = data.colLabels;
            this.table = new Array(this.r);

            this.disabled_rows = this._computeDisabledRows();
            this.disabled_cols = this._computeDisabledCols();
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
                var row_disabled : boolean = this.isRowDisabled(i);

                for (var j = 0; j < this.c; j++)
                {
                    if (row_disabled)
                        row[j] = CellStatus.GRAYED;
                    else
                        row[j] = this.isColDisabled(j) ? CellStatus.GRAYED : CellStatus.OPEN;
                }
                this.table[i] = row;
            }
        }

        isRowDisabled(i : number) : boolean
        {
            return this.disabled_rows.indexOf(i) >= 0;
        }

        isColDisabled(j : number) : boolean
        {
            return this.disabled_cols.indexOf(j) >= 0;
        }

        getRowLabel(r : number) : number[]
        {
            return this.rowLabels[r];
        }

        getColLabel(c : number) : number[]
        {
            return this.colLabels[c];
        }

        getRowLabelStatus(r : number) : RowStatus
        {
            return this.rowLabelStatus[r];
        }

        getColLabelStatus(c : number) : RowStatus
        {
            return this.colLabelStatus[c];
        }

        isCompleted() : boolean
        {
            return (all_el(this.rowLabelStatus, Utils.RowStatus.EQUAL) &&
            all_el(this.colLabelStatus, Utils.RowStatus.EQUAL));
        }

        private _computeDisabledCols() : number[]
        {
            var ar : number[] = [];
            this.colLabelStatus = [];
            this.colLabels.forEach((label : number[], index : number) =>
            {
                if (Utils.PicrossTable._isLabelDisabled(label))
                {
                    ar.push(index);
                    this.colLabelStatus.push(RowStatus.EQUAL);
                }
                else
                    this.colLabelStatus.push(RowStatus.NOT_EQUAL);
            });
            return ar;
        }

        private _computeDisabledRows() : number[]
        {
            var ar : number[] = [];
            this.rowLabelStatus = [];
            this.rowLabels.forEach((label : number[], index : number) =>
            {
                if (Utils.PicrossTable._isLabelDisabled(label))
                {
                    ar.push(index);
                    this.rowLabelStatus.push(RowStatus.EQUAL);
                }
                else
                    this.rowLabelStatus.push(RowStatus.NOT_EQUAL);
            });
            return ar;
        }

        private static _isLabelDisabled(label : number[]) : boolean
        {
            return label.length == 1 && label[0] === 0;
        }

        updateRowStatus(r : number) : void
        {
            this.rowLabelStatus[r] = Utils.PicrossTable._checkRow(this.rowLabels[r], this._checkRowStatus(r))
        }

        updateColStatus(c : number) : void
        {
            this.colLabelStatus[c] = Utils.PicrossTable._checkRow(this.colLabels[c], this._checkColStatus(c));
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
    export function all_el<T>(array : T[], search_val : T) : boolean
    {
        return array.every((el) => el === search_val);
    }
}