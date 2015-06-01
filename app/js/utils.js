///<reference path="interfaces.ts"/>
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
        function PicrossTable(data) {
            this.r = data.rows;
            this.c = data.cols;
            this.rowLabels = data.rowLabels;
            this.colLabels = data.colLabels;
            this.table = new Array(this.r);
            this.disabled_rows = this._computeDisabledRows();
            this.disabled_cols = this._computeDisabledCols();
            this.createEmptyTable();
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
        PicrossTable.prototype.grayCell = function (i, j) {
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
        PicrossTable.prototype._checkRowStatus = function (r) {
            var row = [];
            var incrementer = this.IncrementerFactory(row);
            for (var j = 0; j < this.c; j++)
                incrementer(this.getCellStatus(r, j));
            return row;
        };
        PicrossTable.prototype._checkColStatus = function (c) {
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
        PicrossTable.prototype.createEmptyTable = function () {
            for (var i = 0; i < this.r; i++) {
                var row = new Array(this.c);
                var row_disabled = this.isRowDisabled(i);
                for (var j = 0; j < this.c; j++) {
                    if (row_disabled)
                        row[j] = 2 /* GRAYED */;
                    else
                        row[j] = this.isColDisabled(j) ? 2 /* GRAYED */ : 0 /* OPEN */;
                }
                this.table[i] = row;
            }
        };
        PicrossTable.prototype.isRowDisabled = function (i) {
            return this.disabled_rows.indexOf(i) >= 0;
        };
        PicrossTable.prototype.isColDisabled = function (j) {
            return this.disabled_cols.indexOf(j) >= 0;
        };
        PicrossTable.prototype.getRowLabel = function (r) {
            return this.rowLabels[r];
        };
        PicrossTable.prototype.getColLabel = function (c) {
            return this.colLabels[c];
        };
        PicrossTable.prototype.getRowLabelStatus = function (r) {
            return this.rowLabelStatus[r];
        };
        PicrossTable.prototype.getColLabelStatus = function (c) {
            return this.colLabelStatus[c];
        };
        PicrossTable.prototype.isCompleted = function () {
            return (all_el(this.rowLabelStatus, 0 /* EQUAL */) && all_el(this.colLabelStatus, 0 /* EQUAL */));
        };
        PicrossTable.prototype._computeDisabledCols = function () {
            var _this = this;
            var ar = [];
            this.colLabelStatus = [];
            this.colLabels.forEach(function (label, index) {
                if (Utils.PicrossTable._isLabelDisabled(label)) {
                    ar.push(index);
                    _this.colLabelStatus.push(0 /* EQUAL */);
                }
                else
                    _this.colLabelStatus.push(2 /* NOT_EQUAL */);
            });
            return ar;
        };
        PicrossTable.prototype._computeDisabledRows = function () {
            var _this = this;
            var ar = [];
            this.rowLabelStatus = [];
            this.rowLabels.forEach(function (label, index) {
                if (Utils.PicrossTable._isLabelDisabled(label)) {
                    ar.push(index);
                    _this.rowLabelStatus.push(0 /* EQUAL */);
                }
                else
                    _this.rowLabelStatus.push(2 /* NOT_EQUAL */);
            });
            return ar;
        };
        PicrossTable._isLabelDisabled = function (label) {
            return label.length == 1 && label[0] === 0;
        };
        PicrossTable.prototype.updateRowStatus = function (r) {
            this.rowLabelStatus[r] = Utils.PicrossTable._checkRow(this.rowLabels[r], this._checkRowStatus(r));
        };
        PicrossTable.prototype.updateColStatus = function (c) {
            this.colLabelStatus[c] = Utils.PicrossTable._checkRow(this.colLabels[c], this._checkColStatus(c));
        };
        PicrossTable._checkRow = function (labels, row) {
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
        };
        return PicrossTable;
    })();
    Utils.PicrossTable = PicrossTable;
    function all_el(array, search_val) {
        return array.every(function (el) { return el === search_val; });
    }
    Utils.all_el = all_el;
})(Utils || (Utils = {}));
//# sourceMappingURL=utils.js.map