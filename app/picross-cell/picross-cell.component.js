System.register(["angular2/core", "../js/tableService", "../js/utils"], function(exports_1, context_1) {
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
    var core_1, tableService_1, utils_1;
    var PicrossCellComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tableService_1_1) {
                tableService_1 = tableService_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            PicrossCellComponent = (function () {
                function PicrossCellComponent(tableService) {
                    this.tableService = tableService;
                }
                Object.defineProperty(PicrossCellComponent.prototype, "status", {
                    get: function () {
                        return this.tableService.getCellStatus(this.row, this.col);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PicrossCellComponent.prototype, "isClosed", {
                    get: function () {
                        return this.status === utils_1.CellStatus.CLOSED;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PicrossCellComponent.prototype, "isGrayed", {
                    get: function () {
                        return this.status === utils_1.CellStatus.GRAYED;
                    },
                    enumerable: true,
                    configurable: true
                });
                PicrossCellComponent.prototype.onMouseEnter = function () {
                    var pressing = this.tableService.getPressing();
                    if (pressing !== null)
                        this.tableService.setCellStatus(this.row, this.col, pressing);
                };
                PicrossCellComponent.prototype.onMouseDown = function (event) {
                    if (event.button === 0) {
                        this.tableService.pressedCell(this.row, this.col);
                        this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
                    }
                    else if (event.button === 2) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.tableService.pressedRightCell(this.row, this.col);
                        this.tableService.setPressing(this.tableService.getCellStatus(this.row, this.col));
                    }
                };
                PicrossCellComponent.prototype.onMouseUp = function () {
                    this.tableService.setPressing(null);
                };
                PicrossCellComponent.prototype.onContextMenu = function () {
                    return false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PicrossCellComponent.prototype, "row", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PicrossCellComponent.prototype, "col", void 0);
                PicrossCellComponent = __decorate([
                    core_1.Component({
                        selector: '[picross-cell]',
                        templateUrl: 'app/picross-cell/picross-cell.component.html',
                        styleUrls: ['app/picross-cell/picross-cell.component.css'],
                        host: {
                            '(mouseenter)': 'onMouseEnter()',
                            '(mousedown)': 'onMouseDown($event)',
                            '(mouseup)': 'onMouseUp()',
                            '(contextmenu)': 'onContextMenu()'
                        },
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [tableService_1.TableService])
                ], PicrossCellComponent);
                return PicrossCellComponent;
            }());
            exports_1("PicrossCellComponent", PicrossCellComponent);
        }
    }
});
//# sourceMappingURL=picross-cell.component.js.map