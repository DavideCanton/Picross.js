"use strict";
var Utils;
(function (Utils) {
    (function (CellStatus) {
        CellStatus[CellStatus["OPEN"] = 0] = "OPEN";
        CellStatus[CellStatus["CLOSED"] = 1] = "CLOSED";
        CellStatus[CellStatus["GRAYED"] = 2] = "GRAYED";
    })(Utils.CellStatus || (Utils.CellStatus = {}));
    var CellStatus = Utils.CellStatus;
    (function (RowStatus) {
        RowStatus[RowStatus["EQUAL"] = 0] = "EQUAL";
        RowStatus[RowStatus["WRONG"] = 1] = "WRONG";
        RowStatus[RowStatus["NOT_EQUAL"] = 2] = "NOT_EQUAL";
    })(Utils.RowStatus || (Utils.RowStatus = {}));
    var RowStatus = Utils.RowStatus;
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
        PicrossTable.prototype.closeCell = function (i, j) {
            var status = this.getCellStatus(i, j);
            switch (status) {
                case 1 /* CLOSED */:
                    this.table[i][j] = 0 /* OPEN */;
                    break;
                case 0 /* OPEN */:
                    this.table[i][j] = 1 /* CLOSED */;
                    break;
                case 2 /* GRAYED */:
                    this.table[i][j] = 0 /* OPEN */;
                    break;
            }
        };
        PicrossTable.prototype.crossCell = function (i, j) {
            var status = this.getCellStatus(i, j);
            switch (status) {
                case 1 /* CLOSED */:
                    this.table[i][j] = 2 /* GRAYED */;
                    break;
                case 0 /* OPEN */:
                    this.table[i][j] = 2 /* GRAYED */;
                    break;
                case 2 /* GRAYED */:
                    this.table[i][j] = 0 /* OPEN */;
                    break;
            }
        };
        PicrossTable.prototype.checkRowStatus = function (r) {
            var row = [];
            var incrementer = this.IncrementerFactory(row);
            for (var j = 0; j < this.c; j++)
                incrementer(this.getCellStatus(r, j));
            return row;
        };
        PicrossTable.prototype.checkColStatus = function (c) {
            var col = [];
            var incrementer = this.IncrementerFactory(col);
            for (var i = 0; i < this.r; i++)
                incrementer(this.getCellStatus(i, c));
            return col;
        };
        PicrossTable.prototype.IncrementerFactory = function (res) {
            var currentBlock = false;
            return function (status) {
                if (status === 1 /* CLOSED */) {
                    if (!currentBlock) {
                        res.push(1);
                        currentBlock = true;
                    }
                    else
                        res[res.length - 1]++;
                }
                else
                    currentBlock = false;
            };
        };
        PicrossTable.prototype.createEmptyTable = function (disabled_rows, disabled_cols) {
            for (var i = 0; i < this.r; i++) {
                var row = new Array(this.c);
                var row_disabled = disabled_rows.indexOf(i) >= 0;
                for (var j = 0; j < this.c; j++) {
                    if (row_disabled)
                        row[j] = 2 /* GRAYED */;
                    else {
                        var col_disabled = disabled_cols.indexOf(j) >= 0;
                        row[j] = col_disabled ? 2 /* GRAYED */ : 0 /* OPEN */;
                    }
                }
                this.table[i] = row;
            }
        };
        return PicrossTable;
    })();
    Utils.PicrossTable = PicrossTable;
    function init_val_array(labels) {
        var ar = [];
        labels.forEach(function (label) {
            if (label.length == 1 && label[0] === 0)
                ar.push(0 /* EQUAL */);
            else
                ar.push(2 /* NOT_EQUAL */);
        });
        return ar;
    }
    Utils.init_val_array = init_val_array;
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
    Utils.checkRow = checkRow;
    function all_el(array, search_val) {
        return array.every(function (el) { return el === search_val; });
    }
    Utils.all_el = all_el;
})(Utils || (Utils = {}));
//# sourceMappingURL=utils.js.map