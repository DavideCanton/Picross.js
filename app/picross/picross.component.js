System.register(["angular2/core", "angular2/router", "../js/tableService", "../picross-cell/picross-cell.component", "../picross-label/picross-label.component"], function(exports_1, context_1) {
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
    var core_1, router_1, tableService_1, picross_cell_component_1, picross_label_component_1;
    var PicrossComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tableService_1_1) {
                tableService_1 = tableService_1_1;
            },
            function (picross_cell_component_1_1) {
                picross_cell_component_1 = picross_cell_component_1_1;
            },
            function (picross_label_component_1_1) {
                picross_label_component_1 = picross_label_component_1_1;
            }],
        execute: function() {
            PicrossComponent = (function () {
                function PicrossComponent(params, tableService) {
                    this.tableService = tableService;
                    this.rows = +params.get("w") || 5;
                    this.cols = +params.get("h") || 5;
                }
                PicrossComponent.prototype.ngOnInit = function () {
                    this.tableService.initTable(this.rows, this.cols);
                    this.loaded = true;
                };
                Object.defineProperty(PicrossComponent.prototype, "end", {
                    get: function () {
                        return this.tableService.isCompleted;
                    },
                    enumerable: true,
                    configurable: true
                });
                PicrossComponent.prototype.range = function (limit) {
                    return _.range(limit);
                };
                PicrossComponent.prototype.getRowsData = function () {
                    return this.tableService.getRowsData();
                };
                PicrossComponent.prototype.getColsData = function () {
                    return this.tableService.getColsData();
                };
                PicrossComponent.prototype.disablePressing = function () {
                    this.tableService.setPressing(null);
                };
                PicrossComponent = __decorate([
                    core_1.Component({
                        selector: 'picross-component',
                        templateUrl: 'app/picross/picross.component.html',
                        styleUrls: ['app/picross/picross.component.css'],
                        directives: [picross_cell_component_1.PicrossCellComponent, picross_label_component_1.PicrossLabelComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, tableService_1.TableService])
                ], PicrossComponent);
                return PicrossComponent;
            }());
            exports_1("PicrossComponent", PicrossComponent);
        }
    }
});
//# sourceMappingURL=picross.component.js.map