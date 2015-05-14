"use strict";

var CellStatus = {"OPEN": 0, "CLOSED": 1, "CROSSED": 2};
var RowStatus = {"EQUAL": 0, "WRONG": 1, "NOT_EQUAL": 2};

function PicrossTable(r, c, disabled_rows, disabled_cols)
{
    this.r = r;
    this.c = c;
    this.table = new Array(r);
    createEmptyTable(this.table, this.r, this.c, disabled_rows, disabled_cols);
}

PicrossTable.prototype.getCellStatus = function (i, j)
{
    return this.table[i][j];
};

PicrossTable.prototype.cycleCell = function (i, j)
{
    var status = this.getCellStatus(i, j);
    if (status == CellStatus.OPEN)
        this.table[i][j] = CellStatus.CLOSED;
    else if (status == CellStatus.CLOSED)
        this.table[i][j] = CellStatus.CROSSED;
    else
        this.table[i][j] = CellStatus.OPEN;
};

PicrossTable.prototype.checkRowStatus = function (r)
{
    var row = [];
    var incr = false;
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
};

PicrossTable.prototype.checkColStatus = function (c)
{
    var col = [];
    var incr = false;
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
};

function createEmptyTable(table, r, c, disabled_rows, disabled_cols)
{
    for (var i = 0; i < r; i++)
    {
        var row = new Array(c);
        var row_disabled = disabled_rows.indexOf(i) >= 0;

        for (var j = 0; j < c; j++)
        {
            var col_disabled = disabled_cols.indexOf(j) >= 0;
            row[j] = (row_disabled || col_disabled) ? CellStatus.CROSSED : CellStatus.OPEN;
        }
        table[i] = row;
    }
}

function init_val_array(labels)
{
    var ar = [];
    for (var i = 0; i < labels.length; i++)
    {
        if (labels[i].length == 1 && labels[i][0] === 0)
            ar.push(RowStatus.EQUAL);
        else
            ar.push(RowStatus.NOT_EQUAL);
    }
    return ar;
}


function checkRow(labels, row)
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

function any(array, search_val)
{
    for (var i = 0; i < array.length; i++)
        if (array[i] === search_val)
            return true;
    return false;
}

function all(array, search_val)
{
    for (var i = 0; i < array.length; i++)
        if (array[i] !== search_val)
            return false;
    return true;
}