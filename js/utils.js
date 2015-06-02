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
            this.rows = data.rowLabels.map(function (label) {
                var disabled = PicrossTable._isLabelDisabled(label);
                return {
                    label: label,
                    disabled: disabled,
                    status: disabled ? 0 /* EQUAL */ : 2 /* NOT_EQUAL */
                };
            });
            this.cols = data.colLabels.map(function (label) {
                var disabled = PicrossTable._isLabelDisabled(label);
                return {
                    label: label,
                    disabled: disabled,
                    status: disabled ? 0 /* EQUAL */ : 2 /* NOT_EQUAL */
                };
            });
            this.table = new Array(this.r);
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
                var row_disabled = this.getRowData(i).disabled;
                for (var j = 0; j < this.c; j++) {
                    if (row_disabled)
                        row[j] = 2 /* GRAYED */;
                    else
                        row[j] = this.getColData(j).disabled ? 2 /* GRAYED */ : 0 /* OPEN */;
                }
                this.table[i] = row;
            }
        };
        PicrossTable.prototype.getRowData = function (index) {
            return this.rows[index];
        };
        PicrossTable.prototype.getColData = function (index) {
            return this.cols[index];
        };
        PicrossTable.prototype.isCompleted = function () {
            return (this.rows.every(function (data) { return data.status == 0 /* EQUAL */; }) && this.cols.every(function (data) { return data.status == 0 /* EQUAL */; }));
        };
        PicrossTable._isLabelDisabled = function (label) {
            return label.length == 1 && label[0] === 0;
        };
        PicrossTable.prototype.updateRowStatus = function (r) {
            this.rows[r].status = Utils.PicrossTable._checkRow(this.rows[r].label, this._checkRowStatus(r));
        };
        PicrossTable.prototype.updateColStatus = function (c) {
            this.cols[c].status = Utils.PicrossTable._checkRow(this.cols[c].label, this._checkColStatus(c));
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
})(Utils || (Utils = {}));
//# sourceMappingURL=utils.js.map