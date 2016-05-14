System.register(["angular2/core", "../js/utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, utils_1;
    var TableService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            TableService = (function () {
                function TableService() {
                    this.table = null;
                    this.pressing = null;
                }
                TableService.prototype.setPressing = function (pressing) {
                    this.pressing = pressing;
                };
                TableService.prototype.getPressing = function () {
                    return this.pressing;
                };
                TableService.prototype.initTable = function (row, col) {
                    this.table = utils_1.PicrossTable.randomTable(row, col, 0.8);
                    this.end = false;
                };
                TableService.prototype.updateEnabled = function (r, c) {
                    this.table.updateRowStatus(r);
                    this.table.updateColStatus(c);
                };
                TableService.prototype.getCellStatus = function (i, j) {
                    return this.table.getCellStatus(i, j);
                };
                TableService.prototype.setCellStatus = function (i, j, status) {
                    if (this.end)
                        return;
                    if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled)
                        return;
                    this.table.setCellStatus(i, j, status);
                    this.updateEnabled(i, j);
                    if (this.table.isCompleted())
                        this.end = true;
                };
                Object.defineProperty(TableService.prototype, "isCompleted", {
                    get: function () {
                        return this.end;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableService.prototype.pressedCell = function (i, j) {
                    if (this.end)
                        return;
                    if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled)
                        return;
                    this.table.closeCell(i, j);
                    this.updateEnabled(i, j);
                    if (this.table.isCompleted())
                        this.end = true;
                };
                TableService.prototype.pressedRightCell = function (i, j) {
                    if (this.end)
                        return;
                    if (this.table.getRowData(i).disabled || this.table.getColData(j).disabled)
                        return;
                    this.table.grayCell(i, j);
                    this.updateEnabled(i, j);
                };
                TableService.prototype.clearTable = function () {
                    this.table.clear();
                };
                TableService.prototype.getRowsData = function () {
                    return this.table.getRowsData();
                };
                TableService.prototype.getColsData = function () {
                    return this.table.getColsData();
                };
                Object.defineProperty(TableService.prototype, "rows", {
                    get: function () {
                        return this.table.r;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TableService.prototype, "cols", {
                    get: function () {
                        return this.table.c;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TableService);
                return TableService;
            }());
            exports_1("TableService", TableService);
        }
    }
});
//# sourceMappingURL=tableService.js.map