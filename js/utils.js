"use strict";
var CellStatus;
(function (CellStatus) {
    CellStatus[CellStatus["OPEN"] = 0] = "OPEN";
    CellStatus[CellStatus["CLOSED"] = 1] = "CLOSED";
    CellStatus[CellStatus["CROSSED"] = 2] = "CROSSED";
})(CellStatus || (CellStatus = {}));
var RowStatus;
(function (RowStatus) {
    RowStatus[RowStatus["EQUAL"] = 0] = "EQUAL";
    RowStatus[RowStatus["WRONG"] = 1] = "WRONG";
    RowStatus[RowStatus["NOT_EQUAL"] = 2] = "NOT_EQUAL";
})(RowStatus || (RowStatus = {}));
var PicrossTable = (function () {
    function PicrossTable(r, c, disabled_rows, disabled_cols) {
        this.r = r;
        this.c = c;
        this.table = new Array(r);
        this.createEmptyTable(disabled_rows, disabled_cols);
    }
    PicrossTable.prototype.getCellStatus = function (i, j) {
        return this.table[i][j];
    };
    PicrossTable.prototype.cycleCell = function (i, j) {
        var status = this.getCellStatus(i, j);
        if (status == 0 /* OPEN */)
            this.table[i][j] = 1 /* CLOSED */;
        else if (status == 1 /* CLOSED */)
            this.table[i][j] = 2 /* CROSSED */;
        else
            this.table[i][j] = 0 /* OPEN */;
    };
    PicrossTable.prototype.checkRowStatus = function (r) {
        var row = [];
        var incr = false;
        for (var j = 0; j < this.c; j++) {
            if (this.getCellStatus(r, j) == 1 /* CLOSED */) {
                if (!incr) {
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
    PicrossTable.prototype.checkColStatus = function (c) {
        var col = [];
        var incr = false;
        for (var i = 0; i < this.r; i++) {
            if (this.getCellStatus(i, c) == 1 /* CLOSED */) {
                if (!incr) {
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
    PicrossTable.prototype.createEmptyTable = function (disabled_rows, disabled_cols) {
        for (var i = 0; i < this.r; i++) {
            var row = new Array(this.c);
            var row_disabled = disabled_rows.indexOf(i) >= 0;
            for (var j = 0; j < this.c; j++) {
                var col_disabled = disabled_cols.indexOf(j) >= 0;
                row[j] = (row_disabled || col_disabled) ? 2 /* CROSSED */ : 0 /* OPEN */;
            }
            this.table[i] = row;
        }
    };
    return PicrossTable;
})();
function init_val_array(labels) {
    var ar = [];
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].length == 1 && labels[i][0] === 0)
            ar.push(0 /* EQUAL */);
        else
            ar.push(2 /* NOT_EQUAL */);
    }
    return ar;
}
function checkRow(labels, row) {
    if (labels.length < row.length)
        return 1 /* WRONG */;
    else if (labels.length > row.length)
        return 2 /* NOT_EQUAL */;
    for (var i = 0; i < labels.length; i++)
        if (labels[i] < row[i])
            return 1 /* WRONG */;
        else if (labels[i] > row[i])
            return 2 /* NOT_EQUAL */;
    return 0 /* EQUAL */;
}
function all_el(array, search_val) {
    for (var i = 0; i < array.length; i++)
        if (array[i] !== search_val)
            return false;
    return true;
}
//# sourceMappingURL=utils.js.map